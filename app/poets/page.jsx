"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { apiCall } from "../../api/fetchData"; // Your API utility function
import { BASE_URL, TOKEN_KEY } from "../../lib/constants/constants";
import { getItem } from "../../lib/localStorage";
import { colors } from "@/components/style/theme";

const Container = styled.div`
  padding: 40px;
  margin-top: 50px;
  background: linear-gradient(135deg, #1e1e2f, #2a2a4a);
  min-height: 100vh;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  font-family: "Playfair Display", serif;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  font-size: 1.1rem;
  border: none;
  background: ${(props) =>
    props.active ? "#ffd700" : "rgba(255, 255, 255, 0.1)"};
  color: ${(props) => (props.active ? "#1e1e2f" : "#fff")};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #ffd700;
    color: #1e1e2f;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const PoetCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
  }
`;

const PoetImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 2px solid #ffd700;
`;

const PoetName = styled.h3`
  font-size: 1.4rem;
  margin: 0;
  color: #ffd700;
`;

const Likes = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

const TopPoetsPage = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [poets, setPoets] = useState([]);
  const router = useRouter();

  const fetchTopPoets = async (period) => {
    try {
      const response = await apiCall({
        method: "GET",
        url: `${BASE_URL}/top-poets/${period}`,
        headers: {
          Authorization: `Bearer ${getItem(TOKEN_KEY)}`,
        },
      });
      setPoets(response.data);
    } catch (error) {
      console.error(`Error fetching top poets for ${period}:`, error);
    }
  };

  useEffect(() => {
    fetchTopPoets(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handlePoetClick = (poetId) => {
    router.push(`/poets/${poetId}`);
  };

  return (
    <Container>
      <Title>Top 20 Poets</Title>
      <Tabs>
        {["daily", "weekly", "monthly", "yearly"].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Tab>
        ))}
      </Tabs>
      <CardGrid>
        {poets?.map((poet) => (
          <PoetCard key={poet._id} onClick={() => handlePoetClick(poet?._id)}>
            <div className="flex justify-center items-center flex-col space-y-1">
              <div
                className="w-24 h-24  flex rounded-full items-center justify-center text-4xl text-white"
                style={{
                  background: `linear-gradient(135deg, ${colors.darkPurple}, ${colors.darkPink})`,
                }}
              >
                {poet?.fullName?.charAt(0)}
              </div>
              <PoetName>{poet?.fullName}</PoetName>
              <Likes>Total Likes: {poet?.totalLikes}</Likes>
            </div>
          </PoetCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default TopPoetsPage;
