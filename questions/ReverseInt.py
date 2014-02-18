'''
Reverse Integer 
Reverse digits of an integer.

Example1: x = 123, return 321
Example2: x = -123, return -321

click to show spoilers.
Have you thought about this?
Here are some good questions to ask before coding. 
Bonus points for you if you have already thought through this!

If the integer's last digit is 0, what should the output be? ie,
cases such as 10, 100.

Did you notice that the reversed integer might overflow? 
Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows.
How should you handle such cases?
Throw an exception? Good, but what if throwing an exception is not an option? 

You would then have to re-design the function (ie, add an extra parameter).

'''

def reverse_int(num0):
  num = num0
  if num == 0:
    return num
  
  if num > 0:
    num_list = list(str(num))
    num_list.reverse()
  elif num < 0:
    num_list = list(str(num))[1:]
    num_list.reverse()
    num_list.insert(0,'-')
   
  result = int(''.join(num_list))

  return result

print reverse_int(-123)

    
