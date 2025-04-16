import redis
import os

r = redis.Redis(
    host=os.environ["UPSTASH_HOST"],
    port=int(os.environ["UPSTASH_PORT"]),
    password=os.environ["UPSTASH_PASSWORD"],
    ssl=True,
    decode_responses=True
)