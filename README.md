# root-code-challenge

## Sections

[1. TypeScript and Jest](#type-script-and-jest)

[2. Trips and Drivers](#trips-and-drivers)

## TypeScript and Jest

I chose to complete this problem using TypeScript because it is a language I can quickly write and iterate in, and I have a good understanding of the style rules and idioms which will best demonstrate my ability. Additionally, I believe having strongly typed data helps reinforce deliberate and precise code.

I decided to use Jest to implement the test cases for this project for similar reasons; Jest is a common testing framework and one that I'm familiar with and will allow me to quickly build out test cases without friction. Other benefits of using Jest are that it works well with TypeScript, and can generate a coverage report.

## Trips and Drivers

I decided to aggregate Trips separate from Drivers to limit the growth of the Driver object. Since we update Drivers' average speed when new Trips are recorded, we don't need to store individual Trip data in the Driver model. We may want to access individual Trips in the future, but it is superfluous to return all Trips associated to a Driver every time we pull their record.

I took this consideration not necessarily because it fulfills requirements of this challenge, but because if this example was extended to an actual application, this is how I would like to see the data handled. Since we know we'll be generating reports with Drivers' miles and average speed, we can avoid having to incur the cost of those calculations at the time of the report. In a real-world applicaiton, it would be likely that Trips would be reported one at a time, and that reports would be run on many Drivers at once. For that reason, it is advantageous to store those metrics statically in the Driver objects.

Another consideration was adding a simple function in the Trip class to tell us if it is a valid Trip. In this example, the qualifications for a valid Trip are that the speed is between 5 and 100mph, however if these requirements were to change or expand in the future, it's nice to be able to make those changes in one place. This way we can parse the Trip commands into Trip objects, and then add them to our array only if they pass the isValid() requirements.

## Testing
