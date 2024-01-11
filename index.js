function createEmployeeRecord(array) {
    let employeeRecord = {};

    employeeRecord.firstName  = array[0],
    employeeRecord.familyName = array[1],
    employeeRecord.title = array[2],
    employeeRecord.payPerHour = array[3],

    employeeRecord.timeInEvents = [],
    employeeRecord.timeOutEvents = []

    return employeeRecord;
}
createEmployeeRecord();

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((array) => createEmployeeRecord(array));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hourStr] = dateStamp.split(' ');
    let hour = parseInt(hourStr, 10); 

    const timeIn = {
        type: 'TimeIn',
        hour: hour,
        date: date
    };

    employeeRecord.timeInEvents.push(timeIn);

    return employeeRecord;
}
createTimeInEvent()

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hourString] = dateStamp.split(' ');
    let hour = parseInt(hourString, 10);

    const timeOut = {
        type: 'TimeOut',
        hour: hour,
        date: date
    }

    employeeRecord.timeOutEvents.push(timeOut);

    return employeeRecord;
}
createTimeOutEvent()

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    if (!timeInEvent || !timeOutEvent) {
        return 0;
    }

    const hoursWorked = parseInt(timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked;
}
hoursWorkedOnDate(employeeRecord, "0044-03-15")

function wagesEarnedOnDate(employeeRecord, date) {
    const payOwed = employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date)

    return payOwed;
}

function allWagesFor(employeeRecord) {
    const totalWages = employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
        const date = timeInEvent.date;
        const wagesOnDate = wagesEarnedOnDate(employeeRecord, date)
        return total + wagesOnDate;
    }, 0);

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    const sumOfPay = employeeRecords.reduce((sum, employeeRecord) => {
        const wages = allWagesFor(employeeRecord);
        return sum + wages
    }, 0)

    return sumOfPay;
}