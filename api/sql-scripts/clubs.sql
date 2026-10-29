CREATE TABLE clubs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE,
    city VARCHAR(100),
    founded_year INTEGER CHECK (founded_year > 1800 AND founded_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    country_code character varying(3),
    league character varying(100),
    logo_url character varying(255),
    is_active boolean DEFAULT true,
);