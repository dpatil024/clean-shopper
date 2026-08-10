-- Clean Shopper — replace 4 mismatched product photos with better-styled ones
-- (matched to the soft neutral/editorial feel of the rest of the seeded photos)

update products
set image = 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=400&fit=crop'
where name = 'Lavender Field All-Purpose Cleaner';

update products
set image = 'https://images.unsplash.com/photo-1645567455251-334ed4702f9b?w=400&h=400&fit=crop'
where name = 'Coconut Dish Soap';

update products
set image = 'https://images.unsplash.com/photo-1704307068094-c2c88c467014?w=400&h=400&fit=crop'
where name = 'Foaming Hand Soap, Sandalwood';

update products
set image = 'https://images.unsplash.com/photo-1699528136773-16d8d93f11a4?w=400&h=400&fit=crop'
where name = 'Gentle Daily Shampoo';
