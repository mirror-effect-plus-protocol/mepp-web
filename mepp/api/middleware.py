from django.http import JsonResponse


class BlockOldIOSUserAgentMiddleware:
    """
    Middleware to block requests with User-Agent containing 'MEPP/2.5'.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        if 'MEPP/25' in user_agent:
            return JsonResponse(
                {'error': 'Deprecated version. Please upgrade to MEPP 2.0.'},
                status=403
            )
        return self.get_response(request)
