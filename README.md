<h1>Budget.me</h1>
<h2>Inspiration</h2>
<p>The idea behind Budget.me was to make budgeting as accessible and easy as possible. This meant doing away with manual data entry and complicated analysis to make budgeting simple and easy to get into.</p>

<h2>What it does</h2>
<p>
Budget.me enables users to visualize their income and expenditures with an easy to use and simple to understand UI. Users have the option to instantly
import data from their bank statements, making setup quick and seamless. Based on that data, Budget.me uses Gemini 2.0 Flash to make nuanced, personalized
budgeting recommendations, taking into the importance of each purchase to help people reach their financial goals.
</p>

<h2>How we built it</h2>
<p>
After we settled on the basic design of the website, we took advantage of our prior experience to quickly put together a React frontend with Vite and Tailwind CSS. 
We chose to build our backend with Python to leverage its great ecosystem, and we decided to use Flask for its flexibility and ease of use. We tried using SQL at first,
but we decided to switch once we realized how convenient it is to work separate data by user with MongoDB. For our gen AI features, we decided to use Gemini because its 
an established product that we already had some familiarity with. As we gradually built our backend, we continued to refine our frontend to improve the user experience.
</p>

<h2>Challenges we ran into</h2>
<p>
Challenges we ran into language output in the format we wanted. Even though we all had some experience tweaking AI prompts, it took a lot of trial and error before 
we were able to get Gemini to give consistent output. While doing all this, we also had to get used to using git collaboratively, dealing with merge conflicts and making
sure things are running the same way on everyone's systems. We had to learn a lot of new skills in order to bring our vision to life, especially on the backend. A lot of 
time went into deciding how to structure our data in order to make it scalable, and we also had to work hard on implementing our ideas into an actual MongoDB database. We 
also had to figure out how to use Gemini to wrangle data into useful formats, first for converting PDF files into a format usable by our database and then to give natural
</p>

<h2>Accomplishments that we're proud of</h2>
<p>
We're happy that we were able to make a functioning fullstack app under the time constraints. Despite all the stress of a hackathon, we managed to stick to our project 
and make it the best we could. We're proud of all the challenges we had to overcome and the skills we learned along the way, and we're excited to see how we can use what 
we learned to keep on making cool stuff.
</p>

<h2>What's next for Budget.me?</h2>
<p>>We have already implemented the basic functionality we planned for, so the next step for us would be to deploy our app. There are some more problems we'd need to solve 
to before Budget.me is ready for users, like making sure all data is secure and that our systems are able to work at scale. With more time, we may also want to add some more
ambitious features, like letting people log their investments, giving users more flexibility in what they see in the graph, and adding features to enable users to plan ahead.
We'd also want to refine the advice from the AI to make it more insightful, which we could do by making a specialized AI agent that we could train.
</p>
