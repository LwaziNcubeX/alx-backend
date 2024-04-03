#!/usr/bin/python3
"""
A class FIFO Cache that inherits from BaseCaching
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    A class that inherits from BaseCaching
    """
    def __init__(self):
        """
        Initialize the FIFOCache instance
        """
        super().__init__()
        self.cache_order = []  # List to store insertion order of keys

    def put(self, key, item):
        """
        Add an item to the FIFO cache
        :param key:
        :param item:
        :return:
        """
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed_key = self.cache_order.pop(0)
                del self.cache_data[removed_key]
                print(f"DISCARD {removed_key}")

            self.cache_data[key] = item
            self.cache_order.append(key)
        else:
            return

    def get(self, key):
        """
        Get an item from the FIFO cache
        :param key:
        :return:
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
