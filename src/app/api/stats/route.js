import { NextResponse } from "next/server";
import { statsConfig } from "@/data/statsConfig";
import { initialSkillCategories } from "@/data/skillsData";

export async function GET() {
  const stats = {
    skillCategories: initialSkillCategories,
    github: {
      username: statsConfig.github.username,
      totalRepos: 18,
      stars: 12,
      contributions: 320,
      languages: [
        { name: "JavaScript", percentage: 42, color: "#f7df1e" },
        { name: "TypeScript", percentage: 28, color: "#3178c6" },
        { name: "HTML", percentage: 18, color: "#e34f26" },
        { name: "CSS", percentage: 12, color: "#1572b6" },
      ],
    },
    leetcode: {
      username: statsConfig.leetcode.username,
      enabled: statsConfig.leetcode.enabled,
      totalSolved: 125,
      easySolved: 65,
      mediumSolved: 50,
      hardSolved: 10,
      acceptanceRate: "68.4%",
      totalSubmissions: 240,
    },
    codeforces: {
      username: statsConfig.codeforces.username,
      enabled: statsConfig.codeforces.enabled,
      rating: 0,
      maxRating: 0,
      solved: 0,
    },
    hackerrank: {
      username: statsConfig.hackerrank.username,
      enabled: statsConfig.hackerrank.enabled,
      badges: 0,
      solved: 0,
    },
  };

  try {
    // 1. Fetch GitHub Stats
    if (statsConfig.github.enabled && statsConfig.github.username) {
      const userRes = await fetch(
        `https://api.github.com/users/${statsConfig.github.username}`,
        { next: { revalidate: 3600 } }
      );
      if (userRes.ok) {
        const userData = await userRes.json();
        stats.github.totalRepos = userData.public_repos || stats.github.totalRepos;
      }

      // Fetch repos to estimate languages
      const reposRes = await fetch(
        `https://api.github.com/users/${statsConfig.github.username}/repos?per_page=100`,
        { next: { revalidate: 3600 } }
      );
      if (reposRes.ok) {
        const repos = await reposRes.json();
        if (Array.isArray(repos) && repos.length > 0) {
          const langCounts = {};
          let total = 0;
          repos.forEach((repo) => {
            if (repo.language) {
              langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
              total++;
            }
          });
          if (total > 0) {
            const langColors = {
              JavaScript: "#f7df1e",
              TypeScript: "#3178c6",
              HTML: "#e34f26",
              CSS: "#1572b6",
              Python: "#3572A5",
              Java: "#b07219",
              C: "#555555",
              "C++": "#f34b7d",
            };
            const sortedLangs = Object.entries(langCounts)
              .map(([name, count]) => ({
                name,
                percentage: Math.round((count / total) * 100),
                color: langColors[name] || "#6366f1",
              }))
              .sort((a, b) => b.percentage - a.percentage);

            if (sortedLangs.length > 0) {
              stats.github.languages = sortedLangs;
            }
          }
        }
      }
    }
  } catch (e) {
    console.error("Error fetching GitHub stats:", e);
  }

  try {
    // 2. Fetch LeetCode Stats (Direct GraphQL API)
    if (statsConfig.leetcode.enabled && statsConfig.leetcode.username) {
      const lcRes = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        body: JSON.stringify({
          query: `
            query userProblemsSolved($username: String!) {
              matchedUser(username: $username) {
                submitStatsGlobal {
                  acSubmissionNum {
                    difficulty
                    count
                    submissions
                  }
                }
              }
            }
          `,
          variables: { username: statsConfig.leetcode.username },
        }),
        next: { revalidate: 3600 },
      });

      if (lcRes.ok) {
        const lcData = await lcRes.json();
        const acList = lcData.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
        if (acList && Array.isArray(acList)) {
          const all = acList.find((s) => s.difficulty === "All") || {};
          const easy = acList.find((s) => s.difficulty === "Easy") || {};
          const medium = acList.find((s) => s.difficulty === "Medium") || {};
          const hard = acList.find((s) => s.difficulty === "Hard") || {};

          stats.leetcode.totalSolved = all.count ?? stats.leetcode.totalSolved;
          stats.leetcode.easySolved = easy.count ?? stats.leetcode.easySolved;
          stats.leetcode.mediumSolved = medium.count ?? stats.leetcode.mediumSolved;
          stats.leetcode.hardSolved = hard.count ?? stats.leetcode.hardSolved;
          stats.leetcode.totalSubmissions = all.submissions ?? stats.leetcode.totalSubmissions;

          if (all.submissions && all.submissions > 0) {
            stats.leetcode.acceptanceRate = `${((all.count / all.submissions) * 100).toFixed(1)}%`;
          }
        }
      }
    }
  } catch (e) {
    console.error("Error fetching LeetCode stats:", e);
  }

  return NextResponse.json(stats);
}
