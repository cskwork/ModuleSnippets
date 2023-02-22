/**
 * Essential code snippets
 * 
 * Get the length of an array 
 * Print an array element in C using array size
 * Difference between const int*, const int * const, and int const * in C
 * Check two given integers whether either of them is in the range 100..200 inclusive.
 * Check whether the sequence of numbers 1, 2, 3 appears in a given array of integers somewhere.
 */

// =================================================================
// Get the length of an array 
#include <stdio.h>
int main()
{
 int arr[] = { 10, 20, 30, 40, 50, 60 };
 int size_arra = (arr, sizeof arr / sizeof *arr);
 printf("Number of elements in arr[]:  %d", size_arra);
}
// 6
// =================================================================

// =================================================================
// Print an array element in C using array size
#include <stddef.h>
#include <stdio.h>

static const int values[] = { 10, 20, 30, 40, 50, 60 };
#define ARRAYSIZE(x) (sizeof x/sizeof x[0])
int main (int argc, char *argv[])
{
   size_t i;
   printf("Size of the array: %d\n",ARRAYSIZE(values));
   for (i = 0; i < ARRAYSIZE(values); i++)
   {
       printf("%d ", values[i]);
   }
   return 0;
}

//Size of the array: 6
//10 20 30 40 50 60
// =================================================================

// =================================================================
// Difference between const int*, const int * const, and int const * in C
// Pointer to Constant
#include <stdio.h>
int main() 
{
  const int x = 10;
  const int y = 20;
  const int *z = &x; /* z is a "pointer to a constant." */
  x = 30; /* Error. Cannot change x. */
  y = 40; /* Error. Cannot change y. */
  z = &y; /* OK. */
  *z = 50; /* Error. Cannot change *z */
  return 0;
}
// =================================================================

// =================================================================
// Check two given integers whether either of them is in the range 100..200 inclusive.
#include <stdio.h>
#include <stdlib.h>
int main(void){
    printf("%d",test(100, 199));
    printf("\n%d",test(250, 300));
    printf("\n%d",test(105, 190));
    }   
   int test(int x, int y)
        {
             return (x >= 100 && x <= 200) || (y >= 100 && y <= 200);
        }

/*
1
0
1
*/
// =================================================================

// =================================================================
// Check whether the sequence of numbers 1, 2, 3 appears in a given array of integers somewhere.
// https://www.w3resource.com/c-programming-exercises/basic-algo/c-programming-basic-algorithm-exercises-14.php
#include <stdio.h>
#include <stdlib.h>
int main(void){
    int arr_size;
    
    int array1[] = {1,1,2,3,1};
    arr_size = sizeof(array1)/sizeof(array1[0]);
    printf("%d",test(array1, arr_size));
    
    int array2[] = {1,1,2,4,1};
    arr_size = sizeof(array2)/sizeof(array2[0]);
    printf("\n%d",test(array2, arr_size));
    
    int array3[] = {1,2,2,1,2,3};
    arr_size = sizeof(array3)/sizeof(array3[0]);
    printf("\n%d",test(array3, arr_size));
    }       

  int test(int nums[], int arr_size)
         {
            for (int i = 0; i < arr_size-1; i++)
            {
                if (nums[i] == 1 && nums[i + 1] == 2 && nums[i + 2] == 3)
                    return 1;
            }
           return 0;
        }

// nums[i] == 1 && nums[i + 1] == 2 && nums[i + 2] == 3
/*
1
0
1
*/
// =================================================================


/**
* https://www.w3resource.com/c-programming-exercises/c-snippets/index.php
* https://www.w3resource.com/c-programming-exercises/basic-algo/index.php
*/