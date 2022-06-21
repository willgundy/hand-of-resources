-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`


DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS instructions;
DROP TABLE IF EXISTS measurements;
DROP TABLE IF EXISTS groceries;
DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    "prepTime" INT,
    "cookTime" INT,
    "totalTime" INT,
    servings INT
);

CREATE TABLE instructions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "recipeId" BIGINT NOT NULL,
    "stepNumber" INT NOT NULL,
    description VARCHAR NOT NULL,
    FOREIGN KEY ("recipeId") REFERENCES recipes(id)
);

CREATE TABLE measurements (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description VARCHAR NOT NULL
);

CREATE TABLE groceries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    description VARCHAR NOT NULL,
    brand VARCHAR
);

CREATE TABLE ingredients (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "recipeId" BIGINT NOT NULL,
    amount INT NOT NULL,
    "measurementId" BIGINT NOT NULL,
    "groceryId" BIGINT NOT NULL,
    FOREIGN KEY ("recipeId") REFERENCES recipes(id),
    FOREIGN KEY ("measurementId") REFERENCES measurements(id),
    FOREIGN KEY ("groceryId") REFERENCES groceries(id)
);

INSERT INTO recipes (title, description, "prepTime", "cookTime", "totalTime", servings)
VALUES
  ('PB&J', 'The classic peanut butter and jelly sammy', 1, 2, 3, 1),
  ('Stir Fry Noodles', 'Chicken stir fry noodles with vegetables in a quick and easy stir fry sauce.', 15, 15, 30, 4);

INSERT INTO instructions ("recipeId", "stepNumber", description)
VALUES
  (1, 1, 'Pull out ingredients (Peanut Butter, Jelly, Bread) and a knife to spread ingredients onto bread'),
  (1, 2, 'Spread peanut butter onto one slice of bread'),
  (1, 3, 'Spread jelly onto the other slide of bread'),
  (1, 4, 'Put the two slices of bread together and enjoy'),
  (2, 1, 'Place the chicken in a bowl and toss with 1 tablespoon soy sauce. Let sit while you prep the remaining ingredients.'),
  (2, 2, 'In a small bowl or large liquid measuring cup, combine the three-quarters of the green onions, the remaining 3 tablespoons soy sauce, hoisin, garlic, ginger, and vinegar. Set near the stove. Reserve the remaining green onions for serving.'),
  (2, 3, 'To the now-empty skillet, add the remaining 1 tablespoon oil. Add the vegetables and cook until they begin to brown and soften but are still fairly crisp, about 3 to 4 minutes'),
  (2, 4, 'Add half the scallion mixture and saute until fragrant, about 1 minute.'),
  (2, 5, 'Add the noodles. Cook, using tongs to toss the noodles and coat them with the sauce, for 30 seconds.');

INSERT INTO measurements (description)
VALUES
  ('pounds'),
  ('tablespoons'),
  ('ounces'),
  ('cups'),
  ('slices'),
  ('teaspoons');

INSERT INTO groceries (description, brand)
VALUES
  ('peanut butter', 'jif'),
  ('jelly', 'smuckers'),
  ('bread', 'sisters bakery'),
  ('chicken', ''),
  ('red bell pepper', ''),
  ('carrots', ''),
  ('broccoli', ''),
  ('garlic', ''),
  ('dry long noodles', ''),
  ('eggs', ''),
  ('hot sauce', 'sriracha');


INSERT INTO ingredients ("recipeId", amount, "measurementId", "groceryId")
VALUES
  (1, 2, 3, 1), --peanut butter
  (1, 2, 3, 2), --jelly
  (1, 2, 5, 3), --bread
  (2, 1, 1, 4), --chicken
  (2, 1, 4, 5), --red bell pepper
  (2, 3, 3, 8), --garlic
  (2, 6, 3, 9); --noodles