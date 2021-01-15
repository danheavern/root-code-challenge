# root-code-challenge

## Jump To

[1. Running the script](#running-the-script)

[2. Language and Framework Considerations](#language-and-framework-considerations)

[3. Design](#design)

[4. Representing time](#representing-time)

[5. Testing](#testing)

[6. A Note on Performance and Sorting](#a-note-on-performance-and-sorting)

## Running the Script

This project uses typescript and ts-node, if you don't have that installed you can run:

`npm install -g typescript ts-node`

To run the script with arbitrary files, run:

`npm install`

`ts-node index < {filename}`

Alternatively, the `npm start` script will attempt to run the above command with 'test.txt', which contains the provided test input and can be replaced/modified.

## Language and Framework Considerations

I chose to complete this problem using TypeScript because it is a language I can quickly write and iterate in, and I have a good understanding of the style rules and idioms which will best demonstrate my ability. Additionally, I believe using a strongly-typed language has many benefits, including reinforcing deliberate and precise code.

I decided to use Jest to implement the test cases for this project for similar reasons; Jest is a common testing framework and one that I'm familiar with and will allow me to quickly build out test cases without friction. Other benefits of using Jest are that it works well with TypeScript, and can generate a coverage report.

## Design

My solution consists of 3 classes, Driver, Trip, and Report.

1. **Driver** - Represents a driver, including their name, miles driven, and average speed. I decided to include average speed as an attribute of Driver, and update it with each Trip the Driver takes, in order to save the report generator the cost of reading trip data or calculating average speeds for each Driver. This measure does not necessarily impact the outcome of this example, because we are reading input and generating a report simultaneously. However, in a system where trips/drivers are stored in a database as they happpen and reports are generated at arbitrary times afterword, it is safe to assume that we would rather incur a time cost per event of a Driver registering or a Trip occuring, rather than calculate average speed for each Driver at the time of the report.

1. **Trip** - Represents a single trip. Contains a driver name, a start time in minutes, and end time in minutes, and a distance. In this example, name functions as a primary key for drivers, but a better solution here would be to have a more formal reference to a specific Driver. The trip class has a method called isValid(), which returns true if the trip meets the given requirements for a valid Trip, and false otherwise. Also contains speed, which is a getter that returns the trip's speed (dist/time).

1. **Report** - Contains the run() method, which creates a readline instance to read from the command line and supplies callback functions for when a line is read and when readline is closed. Also contains the rest of the supporting methods for parsing commands, handling commands, and updating report.drivers and report.trips, which store arrays of Drivers and Trips respectively.

## Representing time

Anything time-related would take a bit of consideration in any project. For this example, the smallest denomination of time in the input is minutes, which is why I decided to store time in minutes. This is fairly arbitrary, and as long as conversions and time parsing is thoroughly tested, it is fine for this example. A more robust replacement would be a well-maintained time package, like moment.js to handle time.

## Testing

To run the tests:

`npm t`

My goal for this project was to have 100% test coverage. I tried to follow TDD for the most part, which helped make that goal achievable.

For this project I decided to use TDD; writing function definitions first, writing test cases second, and then implementing the functions to pass the tests. This development model cuts down on many simple mistakes, and writing tests first ensures that you consider the problem before writing any code.

For the tests themselves, I made sure to consider normal cases and boundary cases, e.g. the function isValid is tested against a normal speed, 60mph, speeds near our boundaries, 4.999mph, 5mph, 100mph, 100.001mph, and far outside our boundaries, -60mph, 999999mph.

Additionally, to keep tests isolated from one another, I used jest mocks to mock certain functions. This allows you to know that functions are being called, but not be dependent on their success for the success of the function being tested. I also used std-mock, a package that allowed me to easily mock standard input, making it easy to test that the run function was reading from input successfully.

## A Note on Performance and Sorting

A part of this solution that may appear small but I believe to be of some interest is sorting. In my solution, I opted to wait until the read stream was closed, sort the array once, and then print the report.

In this case, this works because we are reading in data and generating a report in one script. If these steps were removed, as would be the case in a system that stores Trips in a database and generates a report on a scheduled basis, it may be advantageous to store the trips in sorted order. Like how we chose to calculate Drivers' average speed each time they register a trip, this would reduce the amount of calculations needed to be done at the time of the report.

However, the cost incurred by a sort is notably less impactful than the cost of calculating the average speed of each Driver, and it would be just as likely that we would want to sort the data by some other metric in the future, in which case it would not be beneficial to store the data in any particular order.
