#!/usr/bin/python3
""" Base Caching module
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    A class that inherits from BaseCaching
    """

    def put(self, key, item):
        """
        Add an item in the cache
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        Gets an item by key
        """
        if key is None or key not in self.cache_data:
            return None
        return self.cache_data[key]
