#!/usr/bin/python3
"""
A class LIFO Cache that inherits from BaseCaching
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    A class that inherits from BaseCaching
    """

    def __init__(self):
        """
        Initialize the LIFOCache instance
        """
        super().__init__()

    def put(self, key, item):
        """
        Add an item to the LIFO cache
        :param key:
        :param item:
        :return:
        """

        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last_key = list(self.cache_data.keys())[-1]
            del self.cache_data[last_key]
            print("DISCARD:", last_key)

        self.cache_data[key] = item

    def get(self, key):
        """
        Get an item from the LIFO cache
        :param key:
        :return:
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
