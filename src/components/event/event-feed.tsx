"use client"
import {useContext, useEffect, useState} from "react";
import {IEvent} from "@/types/event";
import {filterEvents, getUserEvents} from "@/services/event.service";
import InfiniteScroll from 'react-infinite-scroller';
import EventCard from "@/components/event/event-card";
import {user} from "@/services/user.service";


export function EventFeed({userFeed}: { userFeed: boolean }) {
    const [event, setEvent] = useState<IEvent[]>([]);
    const [loadMore, setLoadMore] = useState<boolean>(true);
    let start = 0;
    let requestInProgress = false;


    useEffect(() => {
        onGet()
    }, [])


    function onGet() {
        if (requestInProgress || !loadMore) return;
        requestInProgress = true;
        (!userFeed ? filterEvents({}, start) : getUserEvents(start))
            .then((res) => {
                if ((res.event.length === 0) || res.event.length < 20) {
                    setLoadMore(false);
                }
                start += 20;
                setEvent([...event, ...res.event]);
                requestInProgress = false;
            })
            .catch((err) => {
                requestInProgress = false;
                console.log(err);
            });
    }

    return (<>
        <InfiniteScroll
            pageStart={0}
            loadMore={onGet}
            hasMore={loadMore}
            loader={<div className="loader flex flex-col items-center gap-6 mt-12" key={0}>Loading ...</div>}
        >
        <div className="flex flex-col items-center gap-6 mt-12">
            {event.map((e, index) => <EventCard event={e} key={index}/>)}
        </div>
            <div className={"flex flex-col items-center gap-6 mt-12 " + ( !requestInProgress && event.length === 0 ? "" : "hidden")}>
                <div className="loader flex flex-col items-center gap-6 mt-12" key={0}>No events found!</div>
            </div>
        </InfiniteScroll>
    </>)
}