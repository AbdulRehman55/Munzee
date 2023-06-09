import React from "react";
import "./styles.scss";
import {text} from "../../utils/locales/all_pages";
import VerticalTabs from "../../components/tabs/vertical";
import TeamMemberCard from "../../components/cards/TeamMemberCard";
import teamMember1 from "../../assets/images/team_member_1.jpeg";
import teamMember2 from "../../assets/images/team_member_2.jpeg";
import teamMember3 from "../../assets/images/team_member_3.jpeg";
import teamMember4 from "../../assets/images/team_member_4.png";
import {Title} from "@mui/icons-material";
import PageTitle from "../../components/pagetitle";

const mockData = [
    {
        avatar: teamMember1,
        name: "Robert Vardeman",
        job: "President",
        description: "Not just the President, but also a devoted player and an overall engaging sorta' guy, Rob spends his days steering the mighty Munzee ship forward, keeping gameplay fresh, and perpetually reinventing the energetic fun that makes Munzee great!",
    },
    {
        avatar: teamMember2,
        name: "Rigo Cisneros",
        job: "Senior Developer",
        description: "Rigo is a Full Stack Web and Game Developer at Freeze Tag. He's responsible for keeping the Munzee game running smoothly as well as building out new server side features. He spends his days optimizing, maintaining, building game logic and API's for our games.",
    },
    {
        avatar: teamMember3,
        name: "Dylan Derryberry",
        job: "Creative director",
        description: "A man who sorta has a plan. He used to wear ties to work, but then Team Munzee broke him into a more laid back jeans and polo kind of guy- or brightly colored suits on special occasions. He studied Journalism at the University of Kansas where he separated his shoulder playing ice hockey. He makes fun of himself, so it’s OK if he makes fun of you.",
    },
    {
        avatar: teamMember4,
        name: "Robbie McGuire",
        job: "Product/Project Manager",
        description: "Robbie has big shoes to fill, but he does all right. When not working on Munzee and WallaBee, you can usually find him playing virtual soccar (soccer with rocket-powered cars).",
    },
    {
        avatar: teamMember4,
        name: "Louise Gibson",
        job: "Global Munzee Events Director",
        description: "Louise lives just outside London in England, has a background in sales (if selling Guinness to the Irish counts), has a BSc Degree in European Business and is fluent in French. She’s Mummy to 2 little boys and is a seriously competitive road cyclist. She is passionate about everything she does and loves to have fun.",
    },
]

const CompanyTeamPage = (): JSX.Element => {

    const team = () => {
        let teamArr = [];

        teamArr = mockData.map(item => {
            return (
                <TeamMemberCard
                    avatar={item.avatar}
                    name={item.name}
                    job={item.job}
                    description={item.description}
                />
            )
        });

        return teamArr;
    }

    return(
        <div id="company-team-page">
            <div className="content-wrapper">
                <VerticalTabs
                    data={[
                        { title: text.menu_items.about, route: "/company/about" },
                        { title: text.menu_items.team, route: "/company/team" },
                        // { title: text.menu_items.press, route: "/press" },
                        // { title: text.menu_items.testimonials, route: "/testimonials" },
                        { title: text.menu_items.play_safe, route: "/playsafe" },
                        { title: text.menu_items.contact, route: "/company/contact" },
                        { title: text.menu_items.terms_of_service, route: "/terms" },
                        { title: text.menu_items.privacy_policy, route: "/privacy" },
                    ]}
                />
                <div className="team-content">
                    <PageTitle title={text.menu_items.team} />
                    <p className="description">{text.company_team_page.desc}</p>
                    <div className="team-content-wrapper">
                        {team()}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CompanyTeamPage;