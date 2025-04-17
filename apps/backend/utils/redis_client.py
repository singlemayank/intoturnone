import redis

r = redis.Redis(
  host='creative-wildcat-11322.upstash.io',
  port=6379,
  password='ASw6AAIncDE1ZjQzYjEyNDVkNjI0ODc0YWI2NjQwY2JlNjE5NmU3OXAxMTEzMjI',
  ssl=True
)

r.set('foo', 'bar')
print(r.get('foo'))