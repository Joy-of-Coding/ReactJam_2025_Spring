# Online Used Carsale Game

### making a merge to make a point

# Getting Started with Rune

### `npm run dev`

Runs the game in Dev UI.

The page will reload when you make changes.

### `npm run upload`

Builds the game and starts upload process to Rune.

### `npm run build`

Builds the game. You can then upload it to Rune using `npx rune@latest upload`.

### `npm run lint`

Runs the validation rules. You can read about them in the [docs on server-side logic](https://developers.rune.ai/docs/advanced/server-side-logic).

## Learn More

See the [Rune docs](https://developers.rune.ai/docs/quick-start) for more info. You can also ask any questions in the [Rune Discord](https://discord.gg/rune-devs), we're happy to help!

---------------------------------
Game Title: Sell the Car
Game opens with a Start Screen.

Minimum Number of Players: 2
    Buyer: person purchasing car from a car dealership.
        As Buyer enters game - they are greeted with screens with choices to set their loan options and
        primary target car criteria. After getting "Pre-Approved" they can meet with the salesperson to negotiate
        an offer for a car. The sale price can be negotiated as well as adding "spiffs" to the car to make it more
        attractive for sale. Buyer can elect to buy negotiated car for price offered or walk away.

        Primary Goal - purchase car at least 1% below list price that meets the criteria set by buyer in the beginning.
        Secondary Goal - purchase car from dealership at a price where the sum of the
        car price without the markup + a number of spiffs making price still 1% below markup.

        Points are awarded or removed for criteria set by the game.

    Salesperson: person selling car at a car dealership. 
        As Salesperson enters game - they are greeted with screens to get cars to sell. The Salesperson sets
        the sales price, but prices are negotiable  if so chosen. Salesperson can be awarded points for selling
        older inventory (as directed by the game) or by adding after market products to the car. Salesperson can
        elect to sell negotiated car for the price offered or walk away.

        Primary Goal - sell car at least 1% above list price, not including spiffs;

        Secondary Goal - buyer does not "walk out" on the sale.

Maximum Number of Players: 6

Nice to haves below according to original discussion
Additional Players:
Sales Manager: person with inventory of cars.
Primary Goal - Keep inventory young by prioritizing sale of older cars. Gains bonuses in this order:
Secondary Goal - 10 points for cars that have been in inventory for less than 2 weeks,
8 points for less than 1 month,
4 points for less than 2 months and
-5 points for cars over 3 months.

Finance Manager.
Primary Goal - sell a loan at the highest interest rate possible
2 points for loans under 10%
4 points for loans greater than or equal to 10% or less than 15%
8 points for loans greater than or equal to 15% or less than 20%
10 points for loans greater than or equal to 20% or leas than 23%
15 points for loans greater than 23%
Secondary goal - sell spiffs that Salesperson was unable to sell
and get the points as the Salesperson would have.
