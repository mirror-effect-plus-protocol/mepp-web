# coding:utf-8


class SessionStatusException(Exception):

    def __init__(self, *args, **kwargs):
        super().__init__(
            'Cannot update `status` directly', *args, **kwargs
        )
