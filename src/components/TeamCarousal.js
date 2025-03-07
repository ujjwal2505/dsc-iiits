import "../styles/team.css";
import firebase from '../firebase';
import { useEffect } from "react";
import React, { useState } from "react";

import TeamCard from "../components/TeamCard";
import { FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";


const COLORS = ["#FFD65F", "#FF4D4D", "#109D58", "#4286F5"]


export default function TeamCarousal(){
	const [members,setMembers]=  useState([])
	useEffect(() => {
		const fetchMembers = async () => {
			const db = firebase.firestore();
			const data = await db.collection("members").get()
			const members = data.docs.map(doc => doc.data())
			setMembers(members)
		}
		fetchMembers()
	},[])
	const [lowerbound,setLowerbound] = useState(0);
	const [upperbound,setUpperbound] = useState(3);
	const numberOfCards = 4;

	const nextSlide = () => {
		if(upperbound < members.length && lowerbound < (members.length-numberOfCards))
		{
			setLowerbound(lowerbound+1);
			setUpperbound(upperbound+1);
		}	
	}
	const prevSlide = () => {
		if(lowerbound > 0)
		{
			setLowerbound(lowerbound-1);
			setUpperbound(upperbound-1);
		}	
	}

    return (
        <section className="team-slider">
            <FaArrowAltCircleLeft className="arrow-left" onClick={prevSlide}/>
            <FaArrowAltCircleRight className="arrow-right" onClick={nextSlide} />
			<div className="card-section">
            	   {
	 	  members.map((member,index) => {
			if(index >= lowerbound && index <= upperbound)
			{
				return <TeamCard key={index} member={member} color={COLORS[index%COLORS.length]}/>
			}else {
				return <></>
			}
	 	  })
	   }
	   </div>
        </section>
    )

}