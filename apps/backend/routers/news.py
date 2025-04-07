from fastapi import APIRouter
import feedparser

router = APIRouter()

@router.get("/news")
def get_latest_news():
    feed_url = "https://www.planetf1.com/feed/"
    feed = feedparser.parse(feed_url)

    if not feed.entries:
        return {"status": "error", "message": "No news found"}

    return {
        "status": "ok",
        "items": [
            {
                "title": entry.title,
                "link": entry.link,
                "published": entry.published if "published" in entry else None,
                "summary": entry.summary if "summary" in entry else "",
            }
            for entry in feed.entries[:5]
        ]
    }
