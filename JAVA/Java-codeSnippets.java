/**
 * Java Programs :
 * Make a custom stack
 * Making a hashmap
 * Memoization in Java
 * Trie Data Structure
 */

// ============================================================
/**
 * Make a custom stack
 * 1 Create custom constructor with three attributes
 * 2 Push method to add to custom array if is not full.
 * 3 Pop method to remove from custom array if not empty.
 */
public class StackCustom {
    int size;
    int arr[];
    int top;

    StackCustom(int size) {
        this.size = size;
        this.arr = new int[size];
        this.top = -1;
    }

    public void push(int pushedElement) {
        if (!isFull()) {
            top++;
            arr[top] = pushedElement;
            System.out.println("Pushed element:" + pushedElement);
        } else {
            System.out.println("Stack is full !");
        }
    }

    public int pop() {
        if (!isEmpty()) {
            int returnedTop = top;
            top--;
            System.out.println("Popped element :" + arr[returnedTop]);
            return arr[returnedTop];

        } else {
            System.out.println("Stack is empty !");
            return -1;
        }
    }

    public int peek() {
        if (!this.isEmpty())
            return arr[top];
        else {
            System.out.println("Stack is Empty");
            return -1;
        }
    }

    public boolean isEmpty() {
        return (top == -1);
    }

    public boolean isFull() {
        return (size - 1 == top);
    }

    public static void main(String[] args) {
        StackCustom StackCustom = new StackCustom(10);
        StackCustom.pop();
        System.out.println("=================");
        StackCustom.push(10);
        StackCustom.push(30);
        StackCustom.push(50);
        StackCustom.push(40);
        System.out.println("=================");
        StackCustom.pop();
        StackCustom.pop();
        StackCustom.pop();
        System.out.println("=================");
    }
}
// ============================================================

// ============================================================
/**
 * Making a hashmap
 * 1 Make a constructor holding array and hash table/map capacity limit number
 * 2 Make an entry map that stores key,value and address of next
 * 3 Make put method thats puts key value pair to the right bucket. In a hash
 * collision, create a new entry and link it to the previous node in the same
 * bucket.
 * 4 Make hash function that takes in the hashcode of the key and divides it by
 * the array capacity with modulo (the hash algorithm)
 * 5 Mak get function to return the right hash bucket
 */
public class MyHashMap<K, V> {

    private static int DEFAULT_CAPACITY = 16;

    private Entry<K, V>[] table;
    private int capacity;

    MyHashMap() {
        this(DEFAULT_CAPACITY);
    }

    MyHashMap(int capacity) {
        this.capacity = capacity;
        /**
         * Initialize "Hash Table" with initial capacity which is nothing but an Array
         * Each index of an array is called "Hash Bucket"
         */
        this.table = new Entry[capacity];
    }

    /**
     * Each Entry stores a key-value pair Each Entry also stores the address of next
     * Entry in case of "Hash Collision"
     */
    static class Entry<K, V> {
        K key;
        V value;
        Entry<K, V> next;

        Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }

        Entry(K key, V value, Entry<K, V> next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }

    public void put(K key, V value) {
        if (key == null) {
            return;
        }

        // Create a key-value pair
        Entry<K, V> newEntry = new Entry<>(key, value);

        // Find the right Bucket by hashing the key
        int hash = hash(key);

        // if - Empty Bucket
        if (table[hash] == null) {
            table[hash] = newEntry;
            // else - "Hash Bucket" is not Empty, Known as "Hash Collision"
            // New Entry is created and linked to Previous Node in Same Bucket
        } else {
            Entry<K, V> current = table[hash];
            Entry<K, V> previous = null;
            while (current != null) {
                if (current.key.equals(key)) {
                    current.value = newEntry.value;
                    return;
                }
                previous = current;
                current = current.next;
            }
            previous.next = newEntry;
        }
    }

    public V get(K key) {
        if (key == null) {
            return null;
        }

        // Find the right Bucket by hashing the key
        int hash = hash(key);

        // if - "Hash Bucket" is Empty, Return null
        if (table[hash] == null) {
            return null;
            // else - "Hash Bucket" is not Empty
            // Traverse through all the linked Nodes in the Bucket
            // Use `equals` method to find the correct key-value pair
        } else {
            Entry<K, V> current = table[hash];
            while (current != null) {
                if (current.key.equals(key)) {
                    return current.value;
                }
                current = current.next;
            }
        }
        return null;
    }

    private int hash(K key) {
        // Using modulo "% capacity" to make sure that returned hash in the range of
        // underlying Array size
        return Math.abs(key.hashCode()) % capacity;
    }

    public static void main(String[] args) {
        MyHashMap<String, Integer> likesPerPost = new MyHashMap<String, Integer>();
        likesPerPost.put("Learning Hash Map", 5);
        System.out.println(likesPerPost.get("Learning Hash Map"));
    }
}
// ============================================================

// ============================================================
/**
 * Memoization in Java
 * 1 Create a memoization hash table
 * 2 Create method fibonacciMemoize that takes in number and checks if memoize
 * table contains the key for the value and returns value if exists else put the
 * value inside memoize table
 * 3
 */
// import java.util.HashMap;
// import java.util.Map;
public class FibonacciMemoizationAlgorithm {

    private Map<Integer, Integer> memoizeTable = new HashMap<>(); // O(1)

    // Fibonacci with Memoization
    public int fibonacciMemoize(int n) {

        if (n == 0)
            return 0;
        if (n == 1)
            return 1;

        if (this.memoizeTable.containsKey(n)) {
            System.out.println("Getting value from computed result for " + n);
            return this.memoizeTable.get(n);
        }

        int result = fibonacciMemoize(n - 1) + fibonacciMemoize(n - 2);

        System.out.println("Putting result in cache for " + n);
        this.memoizeTable.put(n, result);

        return result;

    }

    // Fibonacci without Memoization
    public int fibonacci(int n) {

        if (n == 0)
            return 0;
        if (n == 1)
            return 1;

        System.out.println("Calculating fibonacci number for: " + n);
        return (fibonacci(n - 1) + fibonacci(n - 2));
    }

    public static void main(String[] args) {

        FibonacciMemoizationAlgorithm fibonacciAlgorithm = new FibonacciMemoizationAlgorithm();
        System.out.println("Fibonacci value for n=5:  " + fibonacciAlgorithm.fibonacciMemoize(5));

    }
}
/*
 * Putting result in cache for 2
 * Putting result in cache for 3
 * Getting value from computed result for 2
 * Putting result in cache for 4
 * Getting value from computed result for 3
 * Putting result in cache for 5
 * Fibonacci value for n=5: 5
 */
// ============================================================

// ============================================================
/**
 * Trie Data Structure
 * 1 Create TrieNode Data Object
 * 2 The object has 4 attributes one a linkedlist, check whether array end, save
 * data, save count
 * 3 The object also has getChild method thtat takes char param and returns char
 * in the linkedlist if exists.
 * 4 Create insert word to trie function. In the method get each char from word
 * and if char does not exist in the trienode, add the character to trienode
 * list in a new TrieNode Object and increase count
 * 5
 */
// import java.util.*;
class TrieNode {
    char data;
    boolean isEnd;
    int count;
    LinkedList childList;

    /* Constructor */
    public TrieNode(char c) {
        childList = new LinkedList();
        isEnd = false;
        data = c;
        count = 0;
    }

    public TrieNode getChild(char c) {
        if (childList != null)
            for (TrieNode eachChild : childList)
                if (eachChild.data == c)
                    return eachChild;
        return null;
    }
}

public class TrieDataStructure {
    private TrieNode root;

    /* Constructor */
    public TrieDataStructure() {
        root = new TrieNode(' ');
    }

    /* This function is used to insert a word in trie */
    public void insert(String word) {
        if (search(word) == true)
            return;
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            TrieNode child = current.getChild(ch);
            if (child != null)
                current = child;
            else {
                // If child not present, adding it io the list
                current.childList.add(new TrieNode(ch));
                current = current.getChild(ch);
            }
            current.count++;
        }
        current.isEnd = true;
    }

    /* This function is used to search a word in trie */
    public boolean search(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            if (current.getChild(ch) == null)
                return false;
            else
                current = current.getChild(ch);
        }
        if (current.isEnd == true)
            return true;
        return false;
    }

    /* This function is used to remove function from trie */
    public void remove(String word) {
        if (search(word) == false) {
            System.out.println(word + " is not present in trie");
            return;
        }
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            TrieNode child = current.getChild(ch);
            if (child.count == 1) {
                current.childList.remove(child);
                return;
            } else {
                child.count--;
                current = child;
            }
        }
        current.isEnd = false;
    }

    public static void printAllWordsInTrie(TrieNode root, String s) {
        TrieNode current = root;
        if (root.childList == null || root.childList.size() == 0)
            return;
        Iterator iter = current.childList.iterator();
        while (iter.hasNext()) {
            TrieNode node = iter.next();
            s += node.data;
            printAllWordsInTrie(node, s);
            if (node.isEnd == true) {
                System.out.print(" " + s);
                s = s.substring(0, s.length() - 1);
            } else {
                s = s.substring(0, s.length() - 1);
            }
        }

    }

    public static void main(String[] args) {
        TrieDataStructure t = new TrieDataStructure();
        t.insert("dear");
        t.insert("deal");
        t.insert("do");
        t.insert("he");
        t.insert("hen");
        t.insert("heat");

        System.out.println("hen present in trie : " + t.search("hen"));
        System.out.println("hear present in trie : " + t.search("hear"));
        System.out.println("deal present in trie : " + t.search("deal"));
        System.out.println("========================");
        System.out.println("Printing all word present in trie : ");
        printAllWordsInTrie(t.root, "");
    }
}
/*
 * hen present in trie : true
 * hear present in trie : false
 * deal present in trie : true
 * ========================
 * Printing all word present in trie :
 * dear deal do hen heat he
 */
// ============================================================

/*
 * References:
 * 
 * https://medium.com/hackernoon/top-100-data-structure-and-algorithms-interview
 * -questions-for-practice-d5071e92321e
 * 
 * Design your own hash map in java
 * https://codingnconcepts.com/java/design-hash-map-in-java/
 * 
 * Memoization
 * https://java2blog.com/memoization-example-java/
 * 
 * Trie Data Structure - commonly used for efficient retrieval of keys in a
 * large set of strings or sequences.
 * https://java2blog.com/trie-data-structure-in-java/
 */