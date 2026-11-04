import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting database seeding...');

  // 1. Seed Clubs
  console.log('Seeding clubs...');
  const realMadrid = await prisma.clubs.upsert({
    where: { code: 'RMA' },
    update: {},
    create: {
      name: 'Real Madrid',
      code: 'RMA',
      city: 'Madrid',
      founded_year: 1902,
      country_code: 'ESP',
      league: 'La Liga',
      logo_url: 'https://example.com/logos/rma.png',
      is_active: true,
    },
  });

  const manCity = await prisma.clubs.upsert({
    where: { code: 'MCI' },
    update: {},
    create: {
      name: 'Manchester City',
      code: 'MCI',
      city: 'Manchester',
      founded_year: 1894,
      country_code: 'ENG',
      league: 'Premier League',
      logo_url: 'https://example.com/logos/mci.png',
      is_active: true,
    },
  });

  const bayern = await prisma.clubs.upsert({
    where: { code: 'BAY' },
    update: {},
    create: {
      name: 'Bayern Munich',
      code: 'BAY',
      city: 'Munich',
      founded_year: 1900,
      country_code: 'DEU',
      league: 'Bundesliga',
      logo_url: 'https://example.com/logos/bay.png',
      is_active: true,
    },
  });

  console.log(
    `Clubs seeded: ${realMadrid.name}, ${manCity.name}, ${bayern.name}`,
  );

  // 2. Seed Sample Matches
  console.log('Seeding matches...');
  const matchCount = await prisma.matches.count();

  if (matchCount === 0) {
    await prisma.matches.createMany({
      data: [
        {
          home_club_id: realMadrid.id,
          away_club_id: manCity.id,
          match_date: new Date('2027-05-10T19:00:00Z'),
          status: 'SCHEDULED',
        },
        {
          home_club_id: manCity.id,
          away_club_id: realMadrid.id,
          match_date: new Date('2027-05-18T19:00:00Z'),
          status: 'SCHEDULED',
        },
        {
          home_club_id: bayern.id,
          away_club_id: realMadrid.id,
          match_date: new Date('2027-06-01T20:00:00Z'),
          status: 'SCHEDULED',
        },
      ],
    });
    console.log('3 matches created.');
  } else {
    console.log(
      `Matches already exist (${matchCount} found). Skipping match creation.`,
    );
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
