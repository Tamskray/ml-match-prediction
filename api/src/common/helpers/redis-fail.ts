type AsyncFn = (...args: unknown[]) => Promise<unknown>;

// what each method returns when Redis is unavailable (acts as a cache miss)
const MISS: Record<string, (args: unknown[]) => unknown> = {
  get: () => undefined,
  getMany: ([keys]) => (keys as unknown[]).map(() => undefined),
  set: () => false,
  delete: () => false,
};

export function withFail<T extends object>(
  keyv: T,
  { timeoutMs = 200, cooldownMs = 10_000 } = {},
): T {
  const target = keyv as unknown as Record<string, AsyncFn>;
  let skipUntil = 0; // while now < skipUntil, skip Redis entirely

  for (const [method, miss] of Object.entries(MISS)) {
    const original = target[method].bind(keyv) as AsyncFn;

    target[method] = async (...args) => {
      if (Date.now() < skipUntil) return miss(args);

      let timer: NodeJS.Timeout | undefined;
      const timeout = new Promise<unknown>((resolve) => {
        timer = setTimeout(() => {
          skipUntil = Date.now() + cooldownMs;
          resolve(miss(args));
        }, timeoutMs);
      });

      try {
        return await Promise.race([original(...args), timeout]);
      } finally {
        clearTimeout(timer);
      }
    };
  }

  return keyv;
}
