# root-code-challenge

## Jump To

[1. Running the script](#running-the-script)

[2. TypeScript and Jest](#typescript-and-jest)

[3. Trips and Drivers](#trips-and-drivers)

[4. Representing time](#representing-time)

[5. Testing](#testing)

[6. A Note on Performance and Sorting](#a-note-on-performance-and-sorting)

## Running the Script

This project uses typescript ts-node, if you don't have that installed you can run:

`npm install -g typescript ts-node`

To run the script with arbitrary files, run:

`npm install`

`ts-node index < {filename}`

Alternatively, the `npm start` script will attempt to run the above command with 'test.txt', which contains the provided test input and can be replaced/modified.

## TypeScript and Jest

I chose to complete this problem using TypeScript because it is a language I can quickly write and iterate in, and I have a good understanding of the style rules and idioms which will best demonstrate my ability. Additionally, I believe having strongly typed data helps reinforce deliberate and precise code.

I decided to use Jest to implement the test cases for this project for similar reasons; Jest is a common testing framework and one that I'm familiar with and will allow me to quickly build out test cases without friction. Other benefits of using Jest are that it works well with TypeScript, and can generate a coverage report.

## Trips and Drivers

I decided to aggregate Trips separate from Drivers to limit the growth of the Driver object. Since we update Drivers' average speed when new Trips are recorded, we don't need to store individual Trip data in the Driver model. We may want to access individual Trips in the future, but it is superfluous to return all Trips associated to a Driver every time we pull their record.

I took this consideration not necessarily because it fulfills requirements of this challenge, but because if this example was extended to an actual application, this is how I would like to see the data handled. Since we know we'll be generating reports with Drivers' miles and average speed, we can avoid having to incur the cost of those calculations at the time of the report. In a real-world applicaiton, it would be likely that Trips would be reported one at a time, and that reports would be run on many Drivers at once. For that reason, it is advantageous to store those metrics statically in the Driver objects.

Another consideration was adding a simple function in the Trip class to tell us if it is a valid Trip. In this example, the qualifications for a valid Trip are that the speed is between 5 and 100mph, however if these requirements were to change or expand in the future, it's nice to be able to make those changes in one place. This way we can parse the Trip commands into Trip objects, and then add them to our array only if they pass the isValid() requirements.

## Representing time

Anything time-related would take a bit of copnsideration in any project. For this example, the smallest denomination of time in the input is minutes, which I decided to store time in minutes. This could result in confusion when calculating miles/hour, so I made sure to take that into consideration when writing my test cases. As an additional measure, I included Trip.speed as a getter which calculates the speed. Having this done in a getter, which is tested, further protects from conversion errors.

## Testing

To run the tests:

`npm t`

To generate a coverage report:

`jest --coverage=true`

For this project I decided to use TDD; writing function definitions first, writing test cases second, and then implementing the functions to pass the tests. This development model cuts down on many simple mistakes, and writing tests first ensures that you consider the problem before writing any code.

For the tests themselves, I made sure to consider normal cases and boundary cases, e.g. the function isValid is tested against a normal speed, 60mph, speeds near our boundaries, 4.999mph, 5mph, 100mph, 100.001mph, and far outside our boundaries, -60mph, 999999mph.

If this example was extended, I would seperate the Trip and Driver class tests into seperate test files, but for simplicity, I left the class functions together in models.test.ts and the tests for the functions in our main script in index.test.ts. This brings up the point of organization, which could also be improved by seperating areas of concern into their own classes/files. For simplicity, I limited the scope to one file for the script and another for the object classes (index.ts and models.ts).

## A Note on Performance and Sorting

A part of this solution that may appear small but I believe to be of some interest is sorting. In my solution, I opted to wait until the read stream was closed, sort the array once, and then print the report.

In this case, this works because we are reading in data and generating a report in one script. If these steps were removed, as would be the case in a system that stores Trips in a database and generates a report on a scheduled basis, it may be advantageous to store the trips in sorted order. Like how we chose to calculate Drivers' average speed each time they register a trip, this would reduce the amount of calculations needed to be done at the time of the report.

However, the cost incurred by a sort is notably less impactful than the cost of calculating the average speed of each Driver, and it would be just as likely that we would want to sort the data by some other metric in the future, in which case it would not be beneficial to store the data in any particular order.
