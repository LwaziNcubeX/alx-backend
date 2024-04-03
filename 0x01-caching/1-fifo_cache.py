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

    def put(self, key, item):
        """
        Add an item to the FIFO cache
        :param key:
        :param item:
        :return:
        """

        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            discarded_key = next(iter(self.cache_data))
            del self.cache_data[discarded_key]
            print("DISCARD:", discarded_key)

        self.cache_data[key] = item

    def get(self, key):
        """
        Get an item from the FIFO cache
        :param key:
        :return:
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
