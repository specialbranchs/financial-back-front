
from rest_framework.exceptions import AuthenticationFailed

def unauthenticated_user(view_func):
	def wrapper_func(request, *args, **kwargs):
         
		if not request.COOKIES.get('jwt'):
			raise AuthenticationFailed('User not found')
		else:
			return view_func(request, *args, **kwargs)

	return wrapper_func
