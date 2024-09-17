
import Navbar from '@/components/navbar'
import Image from 'next/image'
import EventCreateBtn from "@/components/event/create-event-btn";
import {EventFeed} from "@/components/event/event-feed";

export default function Home() {
	return (
		<div>
			<div className="my-4 flex items-center justify-center">
				<EventCreateBtn />
			</div>
			<section className="feed">
				<EventFeed user={false} />
			</section>
		</div>
	)
}
