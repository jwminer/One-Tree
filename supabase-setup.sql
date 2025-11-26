-- UnaArbor Database Schema
-- Tables for tree species and fungi information

-- Table: tree_species
CREATE TABLE tree_species (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    species_key TEXT UNIQUE NOT NULL,
    common_name TEXT NOT NULL,
    latin_name TEXT NOT NULL,
    description TEXT,
    family TEXT,
    lifespan TEXT,
    height TEXT,
    status TEXT,
    hero_image TEXT,
    leaf_image TEXT,
    leaf_description TEXT,
    bark_image TEXT,
    bark_description TEXT,
    fruit_image TEXT,
    fruit_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: fungi
CREATE TABLE fungi (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tree_species_id UUID REFERENCES tree_species(id) ON DELETE CASCADE,
    common_name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    risk_level TEXT NOT NULL,
    rot_type TEXT,
    description TEXT,
    danger_text TEXT,
    structural_risk TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tree_species ENABLE ROW LEVEL SECURITY;
ALTER TABLE fungi ENABLE ROW LEVEL SECURITY;

-- Policies: Allow public read access (anon users - for public website)
CREATE POLICY "Allow public read access on tree_species"
    ON tree_species FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow public read access on fungi"
    ON fungi FOR SELECT
    TO anon
    USING (true);

-- Policies: Allow authenticated users to read (needed for admin dashboard)
CREATE POLICY "Allow authenticated read access on tree_species"
    ON tree_species FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated read access on fungi"
    ON fungi FOR SELECT
    TO authenticated
    USING (true);

-- Policies: Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert on tree_species"
    ON tree_species FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update on tree_species"
    ON tree_species FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete on tree_species"
    ON tree_species FOR DELETE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated insert on fungi"
    ON fungi FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update on fungi"
    ON fungi FOR UPDATE
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated delete on fungi"
    ON fungi FOR DELETE
    TO authenticated
    USING (true);

-- Insert initial English Oak data
INSERT INTO tree_species (
    species_key,
    common_name,
    latin_name,
    description,
    family,
    lifespan,
    height,
    status,
    hero_image,
    leaf_image,
    leaf_description,
    bark_image,
    bark_description,
    fruit_image,
    fruit_description
) VALUES (
    'english-oak',
    'English Oak',
    'Quercus robur',
    'The English Oak is the most dominant native tree species in the UK, renowned for its strength, longevity, and ecological importance. It supports more wildlife than any other native tree.',
    'Fagaceae',
    '500-1000 Years',
    'Up to 40m',
    'Native',
    'images/Oak-tree.jpg',
    'images/Oak-leaf.jpg',
    'Deeply lobed with short stalks. Look for the distinct "ear lobes" (auricles) at the very base of the leaf.',
    'images/Oak-bark.jpg',
    'Greyish-brown. Smooth when young, but develops deep, rugged fissures and ridges as it ages.',
    'images/Oak-fruit.jpg',
    'Acorns are borne on long stalks (peduncles), which distinguishes this from the Sessile Oak.'
);

-- Insert fungi data for English Oak
INSERT INTO fungi (
    tree_species_id,
    common_name,
    scientific_name,
    risk_level,
    rot_type,
    description,
    danger_text,
    structural_risk,
    image_url
) VALUES (
    (SELECT id FROM tree_species WHERE species_key = 'english-oak'),
    'Chicken of the Woods',
    'Laetiporus sulphureus',
    'High Risk',
    'Brown Cubical Rot',
    'A bright yellow-orange bracket fungus that causes significant structural decay in oak trees.',
    'Causes brittle fracture and catastrophic failure. Trees with this fungus should be assessed by a qualified arboriculturist immediately.',
    'Severe - can cause sudden branch or trunk failure',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Laetiporus_sulphureus_2011_G1.jpg/320px-Laetiporus_sulphureus_2011_G1.jpg'
);

