import lodash from 'lodash';

const timeSlotsData = ["00:00","00:15","00:30","00:45","01:00","01:15","01:30","01:45","02:00","02:15","02:30","02:45","03:00","03:15","03:30","03:45","04:00","04:15","04:30","04:45","05:00","05:15","05:30","05:45","06:00","06:15","06:30","06:45","07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45","09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00","21:15","21:30","21:45","22:00","22:15","22:30","22:45","23:00","23:15","23:30","23:45","24:00"]

function availableSlots(times, selectedValue = '19:00') {
  if (times.includes("19:00") && times.includes("19:15")) {
    return ["19:00", "19:15"]
  }
  const index = lodash.indexOf(timeSlotsData, selectedValue)
  const availableTimePoints = lodash.map(times, function(time) {
    return lodash.indexOf(timeSlotsData, time)
  })
  const absolutePoints = lodash.map(availableTimePoints, function(timePoint) {
    return {
      index: timePoint,
      point: Math.abs(index - timePoint)
    }
  })
  const sortByPoint = lodash.sortBy(absolutePoints, 'point')
  const takeFirstTwo = lodash.take(sortByPoint, 2)
  const sortByIndex = lodash.sortBy(takeFirstTwo, 'index')
  const nearestTimeSlots = lodash.map(sortByIndex, function(item) {
    return timeSlotsData[item.index]
  })
  return nearestTimeSlots
}

describe('add', () => {
  it('should add two numbers', () => {
    let times = ["18:45", "19:30", "20:15", "20:30"]
    let expected = ["18:45","19:30"]
    expect(availableSlots(times, "19:00")).toEqual(expected);

    times = ["17:00", "17:45", "19:15", "20:30"]
    expected = ["17:45", "19:15"]
    expect(availableSlots(times, "19:00")).toEqual(expected);

    times = ["17:00", "17:45", "19:15", "20:30"]
    expected = ["17:45", "19:15"]
    expect(availableSlots(times, "19:00")).toEqual(expected);
  });
});

[
  {
    time: '19:00',
    seatLeft: 1,
  }
]
