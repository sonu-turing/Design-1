class ListNode {
  value: number;
  next: ListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  head: ListNode | null;
  tail: ListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(value: number) {
    if (this.hasValue(value)) {
      return;
    }
    let node = new ListNode(value);
    if (this.head) {
      this.tail!.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
    node.next = null;
  }

  removeNode(value: number) {
    if (!this.head) return;
    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
    } else {
      let prev: ListNode | null = null;
      let next: ListNode | null = this.head;
      while (next && next.value !== value) {
        prev = next;
        next = next.next;
      }
      if (next) {
        prev!.next = next.next;
        if (next === this.tail) {
          this.tail = prev;
        }
      }
    }
  }

  hasValue(val: number): boolean {
    let temp = this.head;
    while (temp) {
      if (temp.value === val) {
        return true;
      }
      temp = temp.next;
    }
    return false;
  }
}

class MyHashSet {
  private MODULO: number;
  private buckets: (LinkedList | null)[];

  constructor() {
    this.MODULO = 101;
    this.buckets = Array.from({ length: this.MODULO }, () => null);
  }

  add(key: number): void {
    const bucketIndex = key % this.MODULO;
    if (!this.buckets[bucketIndex]) {
      this.buckets[bucketIndex] = new LinkedList();
    }
    this.buckets[bucketIndex].addNode(key);
  }

  remove(key: number): void {
    const bucketIndex = key % this.MODULO;
    if (this.buckets[bucketIndex]) {
      this.buckets[bucketIndex].removeNode(key);
    }
  }

  contains(key: number): boolean {
    const bucketIndex = key % this.MODULO;
    if (this.buckets[bucketIndex]) {
      return this.buckets[bucketIndex].hasValue(key);
    }
    return false;
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
