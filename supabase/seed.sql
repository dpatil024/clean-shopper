-- Clean Shopper — seed data
-- Constructed/synthetic products (not scraped or researched) with real Unsplash
-- photography, matched by category. Paste into the Supabase SQL editor after
-- schema.sql has been run once.

insert into products (image, image_alt, brand, name, verdict, note, highlights) values

-- Cleaning sprays
('https://images.unsplash.com/photo-1550963295-019d8a8a61c5?w=400&h=400&fit=crop', 'Spray bottle of lavender all-purpose cleaner', 'Meadow & Co.', 'Lavender Field All-Purpose Cleaner', 'caution', 'Contains a fragrance blend you''ve asked us to flag in the past.', array['Contains fragrance blend', 'Plant-based surfactants', 'Recyclable bottle']),
('https://images.unsplash.com/photo-1624377225030-f0bb343eaa4d?w=400&h=400&fit=crop', 'Bottle of streak-free glass cleaner', 'Brightside', 'Streak-Free Glass Cleaner', 'avoid', 'Conflicts with an ingredient you''ve asked us to avoid.', array['Contains flagged solvent', 'Non-recyclable bottle']),
('https://images.unsplash.com/photo-1642429948123-bb852afcb0f1?w=400&h=400&fit=crop', 'Spray bottle of citrus bathroom cleaner', 'Basin', 'Citrus Bathroom Cleaner', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'EWG Verified', 'Refill available']),
('https://images.unsplash.com/photo-1617537230936-bb8c9327e84f?w=400&h=400&fit=crop', 'Spray bottle of grease-cutting kitchen cleaner', 'Cedar Grove', 'Grease-Cutting Kitchen Spray', 'caution', 'Contains a preservative you''ve asked us to watch for.', array['Contains flagged preservative', 'Biodegradable formula']),
('https://images.unsplash.com/photo-1556579573-1629c871d914?w=400&h=400&fit=crop', 'Bottle of everyday disinfectant spray', 'Northfield', 'Everyday Disinfectant Spray', 'avoid', 'Contains an ingredient linked to respiratory concerns.', array['Contains flagged disinfectant', 'Strong synthetic fragrance']),

-- Dish & hand soap
('https://images.unsplash.com/photo-1590610994353-7b0e7546e681?w=400&h=400&fit=crop', 'Bottle of unscented dish soap', 'Clearwater', 'Unscented Dish Soap', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'EWG Verified', 'Refill available']),
('https://images.unsplash.com/photo-1649005011845-ef225c89da86?w=400&h=400&fit=crop', 'Bottle of coconut-scented dish soap', 'Palmwood', 'Coconut Dish Soap', 'clean', 'Plant-based and free of ingredients you''ve flagged.', array['Plant-based surfactants', 'Biodegradable formula']),
('https://images.unsplash.com/photo-1597931752949-98c74b5b159f?w=400&h=400&fit=crop', 'Pump bottle of everyday hand soap', 'Clearwater', 'Everyday Hand Soap', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'Refill available']),
('https://images.unsplash.com/photo-1559743344-950d2d9458cc?w=400&h=400&fit=crop', 'Pump bottle of sandalwood foaming hand soap', 'Hearth & Hollow', 'Foaming Hand Soap, Sandalwood', 'caution', 'Contains a fragrance blend you''ve asked us to flag in the past.', array['Contains fragrance blend', 'Plant-based surfactants']),

-- Hair & body
('https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', 'Bottle of gentle daily shampoo', 'Loom & Leaf', 'Gentle Daily Shampoo', 'clean', 'Free of ingredients you''ve flagged in the past.', array['Sulfate-free', 'EWG Verified']),
('https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?w=400&h=400&fit=crop', 'Bottle of gentle daily conditioner', 'Loom & Leaf', 'Gentle Daily Conditioner', 'clean', 'Meets your saved standards — nothing more to check.', array['Sulfate-free', 'Silicone-free']),
('https://images.unsplash.com/photo-1747858989102-cca0f4dc4a11?w=400&h=400&fit=crop', 'Bottle of oat milk body wash', 'Everdry', 'Oat Milk Body Wash', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'Recyclable bottle']),
('https://images.unsplash.com/photo-1655892817271-c66841c2506e?w=400&h=400&fit=crop', 'Bottle of citrus shower gel', 'Basin', 'Citrus Shower Gel', 'caution', 'Contains a fragrance blend you''ve asked us to flag in the past.', array['Contains fragrance blend', 'Plant-based surfactants']),

-- Laundry & fabric
('https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&h=400&fit=crop', 'Bottle of free and clear laundry detergent', 'Northfield', 'Free & Clear Laundry Detergent', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'Dye-free', 'EWG Verified']),
('https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop', 'Bottle of meadow bloom fabric softener', 'Brightside', 'Meadow Bloom Fabric Softener', 'avoid', 'Contains an ingredient you''ve asked us to avoid.', array['Contains flagged fragrance', 'Non-recyclable bottle']),
('https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop', 'Bottle of pre-wash stain remover', 'Cedar Grove', 'Pre-Wash Stain Remover', 'caution', 'Contains a solvent you''ve asked us to watch for.', array['Contains flagged solvent', 'Concentrated formula']),
('https://images.unsplash.com/photo-1582735689283-7b70dbe630ea?w=400&h=400&fit=crop', 'Box of fragrance-free dishwasher pods', 'Clearwater', 'Dishwasher Pods, Fragrance-Free', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'Dye-free']),

-- Personal care
('https://images.unsplash.com/photo-1705897718078-a47e55d82c35?w=400&h=400&fit=crop', 'Bottle of daily hydrating lotion', 'Everdry', 'Daily Hydrating Lotion', 'clean', 'Meets your saved standards — nothing more to check.', array['Fragrance-free', 'EWG Verified']),
('https://images.unsplash.com/photo-1766142167641-507c80e35eb9?w=400&h=400&fit=crop', 'Tube of mineral sunscreen SPF 30', 'Palmwood', 'Mineral Sunscreen SPF 30', 'clean', 'Meets your saved standards — nothing more to check.', array['Mineral filter', 'Reef-safe', 'EWG Verified']),
('https://images.unsplash.com/photo-1768161680637-630f069f243a?w=400&h=400&fit=crop', 'Stick of aluminum-free deodorant', 'Hearth & Hollow', 'Aluminum-Free Deodorant', 'caution', 'Contains a fragrance blend you''ve asked us to flag in the past.', array['Aluminum-free', 'Contains fragrance blend']),
('https://images.unsplash.com/photo-1772689697061-16d7e8a045de?w=400&h=400&fit=crop', 'Jar of barrier repair face moisturizer', 'Loom & Leaf', 'Barrier Repair Moisturizer', 'clean', 'Free of ingredients you''ve flagged in the past.', array['Fragrance-free', 'Dermatologist tested']),
('https://images.unsplash.com/photo-1745159338135-39f6b462b382?w=400&h=400&fit=crop', 'Tube of shea hand cream', 'Meadow & Co.', 'Shea Hand Cream', 'avoid', 'Contains an ingredient you''ve asked us to avoid.', array['Contains flagged preservative', 'Strong synthetic fragrance']);
