const mockExpenses = [
  {
    expense_id: 1,
    budget_id: 12,
    description: "Weekly groceries at Walmart",
    amount: 120.5,
    expense_date: "2025-01-03",
    created_at: "2025-01-03T10:30:00",
  },
  {
    expense_id: 2,
    budget_id: 10,
    description: "Vegetables and fruits at Farmer's Market",
    amount: 45.75,
    expense_date: "2025-01-10",
    created_at: "2025-01-10T11:00:00",
  },
  {
    expense_id: 3,
    budget_id: 8,
    description: "Monthly apartment rent",
    amount: 1200.0,
    expense_date: "2025-01-01",
    created_at: "2025-01-01T09:00:00",
  },
  {
    expense_id: 4,
    budget_id: 8,
    description: "Car oil change",
    amount: 80.0,
    expense_date: "2025-01-20",
    created_at: "2025-01-20T15:00:00",
  },
  {
    expense_id: 5,
    budget_id: 10,
    description: "Tire replacement",
    amount: 220.0,
    expense_date: "2025-01-25",
    created_at: "2025-01-25T12:30:00",
  },
  {
    expense_id: 6,
    budget_id: 12,
    description: "Movie night",
    amount: 25.0,
    expense_date: "2025-01-05",
    created_at: "2025-01-05T19:00:00",
  },
  {
    expense_id: 7,
    budget_id: 12,
    description: "Concert tickets",
    amount: 100.0,
    expense_date: "2025-01-15",
    created_at: "2025-01-15T20:00:00",
  },
  {
    expense_id: 111,
    budget_id: 10,
    description: "Dinner at Olive Garden",
    amount: 60.0,
    expense_date: "2025-01-12",
    created_at: "2025-01-12T18:00:00",
  },
  {
    expense_id: 8,
    budget_id: 10,
    description: "Coffee and snacks at Starbucks",
    amount: 15.0,
    expense_date: "2025-01-13",
    created_at: "2025-01-13T09:30:00",
  },
  {
    expense_id: 10,
    budget_id: 12,
    description: "Flight tickets",
    amount: 1500.0,
    expense_date: "2025-06-01",
    created_at: "2025-06-01T08:00:00",
  },
  {
    expense_id: 12,
    budget_id: 12,
    description: "Hotel booking",
    amount: 800.0,
    expense_date: "2025-06-05",
    created_at: "2025-06-05T10:00:00",
  },
  {
    expense_id: 22,
    budget_id: 10,
    description: "Monthly health insurance premium",
    amount: 100.0,
    expense_date: "2025-01-01",
    created_at: "2025-01-01T08:30:00",
  },
  {
    expense_id: 10,
    budget_id: 8,
    description: "Electricity bill",
    amount: 120.0,
    expense_date: "2025-01-05",
    created_at: "2025-01-05T14:00:00",
  },
  {
    expense_id: 12,
    budget_id: 8,
    description: "Internet subscription",
    amount: 80.0,
    expense_date: "2025-01-08",
    created_at: "2025-01-08T10:00:00",
  },
  {
    expense_id: 15,
    budget_id: 8,
    description: "Monthly gym membership fee",
    amount: 50.0,
    expense_date: "2025-01-01",
    created_at: "2025-01-01T07:00:00",
  },
];

const mockBudgets = [
  {
    budget_id: 1,
    user_id: 101,
    name: "Groceries",
    category: "Food",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    total_amount: 400.0,
  },
  {
    budget_id: 2,
    user_id: 101,
    name: "Rent",
    category: "Housing",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    total_amount: 1200.0,
  },
  {
    budget_id: 3,
    user_id: 102,
    name: "Car Maintenance",
    category: "Transportation",
    start_date: "2025-01-15",
    end_date: "2025-02-15",
    total_amount: 300.0,
  },
  {
    budget_id: 4,
    user_id: 103,
    name: "Entertainment",
    category: "Recreation",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    total_amount: 150.0,
  },
  {
    budget_id: 5,
    user_id: 101,
    name: "Dining Out",
    category: "Food",
    start_date: "2025-01-10",
    end_date: "2025-01-20",
    total_amount: 200.0,
  },
  {
    budget_id: 6,
    user_id: 104,
    name: "Vacation",
    category: "Travel",
    start_date: "2025-06-01",
    end_date: "2025-06-30",
    total_amount: 2500.0,
  },
  {
    budget_id: 7,
    user_id: 102,
    name: "Health Insurance",
    category: "Health",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    total_amount: 1000.0,
  },
  {
    budget_id: 8,
    user_id: 103,
    name: "Utilities",
    category: "Housing",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    total_amount: 300.0,
  },
  {
    budget_id: 9,
    user_id: 104,
    name: "Gym Membership",
    category: "Recreation",
    start_date: "2025-01-01",
    end_date: "2025-01-31",
    total_amount: 50.0,
  },
];

const mockNewsResponse = {
  meta: {
    found: 3571,
    returned: 3,
    limit: 3,
    page: 1,
  },
  data: [
    {
      uuid: "df4ad427-a672-4c67-b6c6-6f81aa00e164",
      title:
        "Tesla stock jumps after announcement it will join S&P 500 in one go",
      description:
        "Tesla's stock price surged early Tuesday after the company b...",
      keywords: "Business, s&p 500, stocks, tesla",
      snippet: "Tesla’s stock price surged early Tuesday after the company...",
      url: "https://nypost.com/2020/12/01/tesla-stock-jumps-on-news-it-will-join-sp-500-in-one-shot/",
      image_url:
        "https://nypost.com/wp-content/uploads/sites/2/2020/12/tesla-52.jpg?quality=90&strip=all&w=1200",
      language: "en",
      published_at: "2020-12-01T14:35:46.000000Z",
      source: "nypost.com",
      categories: ["business"],
      relevance_score: 153.61266,
    },

    {
      uuid: "5d9973d9-b088-4599-b5d9-b140a7a966e1",
      title:
        "Trump to order 'national energy emergency,' eliminate federal DEI programs as part of executive actions",
      description:
        'President Trump will order a "national energy emergency" and issue a "presidential memorandum on inflation" as part of a slew of executive actions Monday, offic...',
      keywords: "Article, 117886219",
      snippet:
        'Many of the executive actions are expected to be signed "as soon as possible."\n\nPresident Donald Trump will order a "national energy emergency" and issue a "pre...',
      url: "https://abcnews.go.com/US/trump-order-national-energy-emergency-issue-memorandum-inflation/story?id=117886219",
      image_url:
        "https://i.abcnewsfe.com/a/4881677e-c790-4ff0-96a9-1d8dd0c92ac1/trump-smiling-gty-jt-250115_1736985063164_hpMain_16x9.jpg?w=1600",
      language: "en",
      published_at: "2025-01-20T15:32:30.000000Z",
      source: "abcnews.go.com",
      categories: ["general"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "41fd5cfa-a2a2-4a3c-95de-f6f9255a9a50",
      title:
        "Inauguration 2025: The tradition of presidents leaving letters for their successors",
      description:
        "As President Joe Biden prepared to pass the baton to President-elect Donald Trump, he followed the tradition of leaving his successor a note.",
      keywords: "Article, 117626959",
      snippet:
        "Biden wrote Trump a letter but did not disclose what his message said.\n\nAs President Joe Biden prepared to pass the baton to President-elect Donald Trump, he fo...",
      url: "https://abcnews.go.com/Politics/inauguration-2025-tradition-presidents-leaving-letters-successors/story?id=117626959",
      image_url:
        "https://i.abcnewsfe.com/a/652e3276-bafa-4fce-9d7a-d2968ff98581/inauguration-trump27-gty-ml-250120_1737385981574_hpMain_16x9.jpg?w=1600",
      language: "en",
      published_at: "2025-01-20T15:31:27.000000Z",
      source: "abcnews.go.com",
      categories: ["general"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "dc1f4a6c-4391-42a9-91cc-b54de4e6d92c",
      title:
        "Trump to sign flurry of executive actions and memos on Day One — on electric vehicles, inflation, immigration, more",
      description:
        "Donald Trump plans to sign roughly 200 executive actions, memoranda and proclamations upon taking office Monday.",
      keywords: "",
      snippet:
        "Senior adviser to Trump gives preview of what to expect from his second term\n\nPresident-elect Donald Trump will sign roughly 200 executive actions, memoranda an...",
      url: "https://www.cbsnews.com/news/trump-energy-emergency-executive-orders-inflation/",
      image_url:
        "https://assets3.cbsnewsstatic.com/hub/i/r/2022/08/09/f9effd77-099e-436f-bded-249fad6df31b/thumbnail/1200x630g1/f671579d749c977bedb50eea8a0ca12b/gettyimages-897254618.jpg?v=b37f0cace52a6645c18f53563f47da2c",
      language: "en",
      published_at: "2025-01-20T15:29:09.000000Z",
      source: "cbsnews.com",
      categories: ["general", "politics"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "50ad5af2-a255-4d86-a08d-8c973dc179f3",
      title:
        "Historians discuss Trump's lasting impact as he prepares for second term",
      description:
        "As President-elect Donald Trump prepares to take office again, historians Julian Zelizer, Marsha Barrett, and Nicole Hemmer reflect on his historical legacy.",
      keywords: "Donald Trump",
      snippet:
        "Historians discuss Trump's lasting impact as he prepares for second term As President-elect Donald Trump prepares to take office again, historians Julian Zelize...",
      url: "https://www.cbsnews.com/video/historians-discuss-trumps-lasting-impact-as-he-prepares-for-second-term/",
      image_url:
        "https://assets3.cbsnewsstatic.com/hub/i/r/2025/01/20/861b129e-da13-4050-98da-a4346e1bc6f0/thumbnail/1200x630/ae5fc54545b3426abbc355a1ede2b9d4/0120-cmo-history.jpg?v=b37f0cace52a6645c18f53563f47da2c",
      language: "en",
      published_at: "2025-01-20T15:28:25.000000Z",
      source: "cbsnews.com",
      categories: ["general"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "d976fb71-2c20-4f58-a309-11e59abf8879",
      title:
        "Morgan Freeman, Anthony Hopkins, Amanda Seyfried & Christina Aguilera Hit Star-Studded Joy Awards As Egyptian Picture ‘Sons Of Risk 3’ Tops Public-Voted Prizes",
      description:
        "Morgan Freeman, Anthony Hopkins, Amanda Seyfried, Christina Aguilera Hit Joy Awards As Egyptian Action Picture ‘Sons Of Risk 3’ Tops Film Prizes",
      keywords: "",
      snippet:
        "Oscar-winning actor Morgan Freeman was celebrated at the fifth edition of Saudi Arabia’s Joy Awards in Riyadh over the weekend, with Anthony Hopkins presentin...",
      url: "https://deadline.com/2025/01/morgan-freeman-anthony-hopkins-amanda-seyfried-christina-aguilera-joy-awards-egyptian-action-picture-sons-of-risk-3-1236261501/",
      image_url:
        "https://deadline.com/wp-content/uploads/2025/01/MixCollage-20-Jan-2025-03-23-PM-158.jpg?w=1024",
      language: "en",
      published_at: "2025-01-20T15:26:45.000000Z",
      source: "deadline.com",
      categories: ["entertainment"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "31fff0f2-8d37-4601-9dfd-fd0929eaf259",
      title: "'No active direct threats' to inauguration events: USSS",
      description:
        "Trump's swearing-in was moved indoors to the Capitol Rotunda, which could alter security plans. However, there are no",
      keywords: "Article, 117870645",
      snippet:
        'There are "no active direct threats" to the presidential inauguration ceremony on Monday, the lead coordinator for the United States Secret Service told ABC New...',
      url: "https://abcnews.go.com/Politics/active-direct-threats-inauguration-events-usss/story?id=117870645",
      image_url:
        "https://i.abcnewsfe.com/a/afd8bac9-c274-48d3-86c4-1422211d15fe/capitol-gty-gmh-250119_1737334645858_hpMain_16x9.jpg?w=1600",
      language: "en",
      published_at: "2025-01-20T15:22:14.000000Z",
      source: "abcnews.go.com",
      categories: ["general"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "3a2f7c5d-34dd-481c-bae0-05d9f64425bb",
      title:
        "Trump team announces renaming of Gulf of Mexico, Mt. Denali among day 1 executive orders",
      description:
        "President-elect Donald Trump's incoming press secretary has announced that Trump plans to rename the Gulf of Mexico and Mt. Denali as part of his day 1 executiv...",
      keywords: "Gulf of Mexico, Donald Trump, Politics, Democrats",
      snippet:
        "Trump team announces renaming of Gulf of Mexico, Mt. Denali among day 1 executive orders President-elect Donald Trump's incoming press secretary has announced t...",
      url: "https://www.cbsnews.com/video/trump-team-announces-renaming-of-gulf-of-mexico-mt-denali-will-be-among-day-1-executive-orders/",
      image_url:
        "https://assets1.cbsnewsstatic.com/hub/i/r/2025/01/20/c1d73351-7bb8-411e-b7f1-5253fcdecc8c/thumbnail/1200x630/1c3f043fd12031b6baed152aa5f5a86a/cbsn-fusion-trump-team-announces-renaming-of-gulf-of-mexico-mt-denali-will-be-among-day-1-executive-orders-thumbnail.jpg?v=b37f0cace52a6645c18f53563f47da2c",
      language: "en",
      published_at: "2025-01-20T15:17:00.000000Z",
      source: "cbsnews.com",
      categories: ["general", "politics"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "982e0aa2-79bb-45aa-9b86-660f2a782663",
      title:
        "Lynne Taylor-Corbett Dies: Choreographer For Hollywood’s ‘Footloose’, Broadway’s ‘Titanic’ Was 78",
      description:
        "Taylor-Corbett was Tony Award-nominated for her choreography and direction of Broadway's 'Swing!'",
      keywords: "",
      snippet:
        "Lynne Taylor-Corbett, the Tony Award-nominated choreographer of Broadway‘s Swing and Titanic who also left an indelible mark on Hollywood by guiding Kevin Bac...",
      url: "https://deadline.com/2025/01/lynne-taylor-corbett-dead-1236261394/",
      image_url:
        "https://deadline.com/wp-content/uploads/2025/01/GettyImages-563590971.jpg?w=1024",
      language: "en",
      published_at: "2025-01-20T15:13:22.000000Z",
      source: "deadline.com",
      categories: ["entertainment"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "970a73f3-e26a-4007-b0d9-f616623e5049",
      title:
        "The Baltimore Ravens dropped their Super Bowl chance and Lamar Jackson knows it",
      description:
        "A trip to the AFC championship game — and possibly the Super Bowl — slipped through the Baltimore Ravens' collective fingers.",
      keywords: "",
      snippet:
        "A trip to the AFC championship game — and possibly the Super Bowl — slipped through the Baltimore Ravens' collective fingers.\n\nStar quarterback Lamar Jackso...",
      url: "https://www.nbcnews.com/sports/nfl/baltimore-ravens-drops-mark-andrews-rcna188381",
      image_url:
        "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2025-01/250120-mark-andrews-ravens-mb-1415-0e1db3.jpg",
      language: "en",
      published_at: "2025-01-20T15:11:46.000000Z",
      source: "nbcnews.com",
      categories: ["general", "politics"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "34342bfc-a1f1-41a0-a7ba-f7500e1e90db",
      title:
        'Chappell Roan Says She Would Be “Way Bigger” If She Wore "a Muzzle"',
      description: "Chappell Roan proclaimed that she'd be even",
      keywords: "",
      snippet:
        'Watch : Chappell Roan Confronts “Disrespectful” Photographer on Red Carpet\n\nGood luck to anyone who expects Chappell Roan to be anyone but herself.\n\nThe "Re...',
      url: "https://www.eonline.com/news/1412348/chappell-roan-says-she-would-be-way-bigger-if-she-was-okay-wearing-a-muzzle?cmpid=rss-syndicate-genericrss-us-top_stories",
      image_url:
        "https://akns-images.eonline.com/eol_images/Entire_Site/2024926/rs_1200x1200-241026092807-1200-chappell-roan-olivia-rodrigo-guts-world-tour-premiere-netflix-cjh-102524.jpg?fit=around|1080:1080&output-quality=90&crop=1080:1080;center,top",
      language: "en",
      published_at: "2025-01-20T15:11:04.000000Z",
      source: "eonline.com",
      categories: ["entertainment", "general"],
      relevance_score: null,
      locale: "us",
    },
    {
      uuid: "c9a23881-12dd-4005-8982-7b6552a2eb50",
      title: "Tesla To Join S&P 500 With Full Market Cap On December 21",
      description:
        "Tesla will be added to the S&P 500 index all at once at its ...",
      keywords: "Tesla, S&P500, EV, Automotive, Stocks, Investing",
      snippet:
        "Tesla (NASDAQ: TSLA) will be added to the S&P 500 index all ...",
      url: "https://oilprice.com/Latest-Energy-News/World-News/Tesla-To-Join-SP-500-With-Full-Market-Cap-On-December-21.html",
      image_url:
        "https://d32r1sh890xpii.cloudfront.net/news/718x300/2020-12-01_xwjdajwctl.jpg",
      language: "en",
      published_at: "2020-12-01T16:30:00.000000Z",
      source: "oilprice.com",
      categories: ["general", "business"],
      relevance_score: 146.92773,
    },
    {
      uuid: "18afdb1c-7742-4016-bf8c-a2f114e11199",
      title: "Tesla to Enter S&P 500 at Full Weight in December",
      description:
        "The electric-vehicle maker will be added to the broad stock-...",
      keywords:
        "Motor Vehicles, Alternative Fuel Vehicles, Trusts Funds Financial Vehicles, Diversified Holding Companies, Automotive",
      snippet: "S&P Dow Jones Indices said it will add Tesla Inc.’s full w...",
      url: "https://www.wsj.com/articles/tesla-to-enter-s-p-500-at-full-weight-in-december-11606780897?mod=pls_whats_news_us_business_f",
      image_url: "https://images.wsj.net/im-265933/social",
      language: "en",
      published_at: "2020-12-01T00:01:00.000000Z",
      source: "online.wsj.com",
      categories: ["business"],
      relevance_score: 128.22346,
    },
  ],
};

export { mockBudgets, mockExpenses, mockNewsResponse };
