#!/usr/bin/python3
"""
class LFUCache that inherits from BaseCaching and is a caching system
"""
from collections import defaultdict
from datetime import datetime
from functools import total_ordering
from base_caching import BaseCaching


@total_ordering
class CacheItem:
    """
    Class to represent an item stored in the cache.
    """

    def __init__(self, key, value):
        """
        Initialize a CacheItem object.

        Args:
            key: The key associated with the item.
            value: The value of the item.
        """
        self.key = key
        self.value = value
        self.frequency = 1
        self.last_used = datetime.now()

    def __eq__(self, other):
        """
        Compare two CacheItem objects for equality.
        """
        return (self.frequency, self.last_used) == (
            other.frequency, other.last_used)

    def __lt__(self, other):
        """
        Compare two CacheItem objects for less than.
        """
        return (self.frequency, self.last_used) < (
            other.frequency, other.last_used)


class LFUCache(BaseCaching):
    """
    Inherits from BaseCaching.
    """

    def __init__(self):
        """
        Initialize the LFUCache object.
        """
        super().__init__()
        self.frequency_map = defaultdict(list)

    def put(self, key, item):
        """
        Add an item to the cache.

        If the cache is full, remove the least frequently used item.

        Args:
            key: The key of the item.
            item: The item to be stored.
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key].value = item
            self.cache_data[key].frequency += 1
            self.cache_data[key].last_used = datetime.now()
        else:
            if len(self.cache_data) >= self.MAX_ITEMS:
                self._remove_least_frequent_used()

            new_item = CacheItem(key, item)
            self.cache_data[key] = new_item
            self.frequency_map[1].append(new_item)

    def get(self, key):
        """
        Retrieve an item from the cache.

        Args:
            key: The key of the item to retrieve.

        Returns:
            The value of the item if found, None otherwise.
        """
        if key is None or key not in self.cache_data:
            return None

        item = self.cache_data[key]
        item.frequency += 1
        item.last_used = datetime.now()
        return item.value

    def _remove_least_frequent_used(self):
        """
        Remove the least frequently used item from the cache.
        """
        min_freq = min(self.frequency_map.keys())
        lfu_items = self.frequency_map[min_freq]
        lfu_items.sort()
        item_to_remove = lfu_items[0]

        del self.cache_data[item_to_remove.key]
        lfu_items.pop(0)

        if not lfu_items:
            del self.frequency_map[min_freq]

        print(f"DISCARD: {item_to_remove.key}")

    def print_cache(self):
        """
        Print the current contents of the cache.
        """
        print("Current cache:")
        for key, item in self.cache_data.items():
            print(f"{key}: {item.value}")
