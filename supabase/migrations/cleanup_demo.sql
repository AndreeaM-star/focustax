-- Run this in Supabase SQL Editor to remove demo/test data
DELETE FROM facturi WHERE company_id IN (
  SELECT id FROM companies WHERE LOWER(nume) LIKE '%demo%' OR LOWER(nume) LIKE '%test%'
  OR LOWER(nume) LIKE '%fictiv%' OR LOWER(cui) LIKE '%demo%'
);
DELETE FROM angajati WHERE company_id IN (
  SELECT id FROM companies WHERE LOWER(nume) LIKE '%demo%' OR LOWER(nume) LIKE '%test%'
);
DELETE FROM companies WHERE LOWER(nume) LIKE '%demo%' OR LOWER(nume) LIKE '%test%'
  OR LOWER(nume) LIKE '%fictiv%' OR LOWER(cui) LIKE '%demo%';
