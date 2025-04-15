import redis

r = redis.Redis(
    host="34.236.49.198",  # or "redis" in Docker
    port=6379,
    db=0,
    decode_responses=True  # return strings not bytes
)
