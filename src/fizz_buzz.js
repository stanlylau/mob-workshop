/**
 * Requirements:
 * For factor of three print Fizz instead of the number
 * For factor of five print Buzz instead of the number
 * For numbers which are factors of both three and five print FizzBuzz instead of the number
 */
function say(number) {
    if(number % 15 == 0)
      return 'FizzBuzz'

    if(number % 3 == 0)
      return 'Fizz'

    if(number % 5 == 0)
      return 'Buzz'

    return number
}

export default say