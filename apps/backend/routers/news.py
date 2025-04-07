from fastapi import APIRouter
import feedparser

router = APIRouter()

@router.get("/news")
def get_latest_news():
    feed_url = "https://www.racefans.net/feed/"
    feed = feedparser.parse(feed_url)

    if not feed or not hasattr(feed, "entries") or not feed.entries:
        return {"status": "error", "message": "No news found"}

    return {
        "status": "ok",
        "items": [
            {
                "title": entry.title,
                "link": entry.link,
                "published": entry.get("published", ""),
                "summary": entry.get("summary", ""),
            }
            for entry in feed.entries[:5]
        ]
    }
