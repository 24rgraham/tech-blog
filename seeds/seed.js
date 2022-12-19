const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = [
  {
    name: "John Cusack",
    email: "john@cusack.com",
    password: "Iamjohn",
  },
  {
    name: "Jack Sparrow",
    email: "jack@sparrow.com",
    password: "Iamthecaptain",
  },
  {
    name: "Harry Potter",
    email: "yourawizard@harry.com",
    password: "voldemort",
  },
];

const postData = [
  {
    title: "I like techblogs",
    content: "Ennui vape la croix affogato fit. Before they sold out swag ramps wolf. Dreamcatcher palo santo truffaut banjo microdosing messenger bag sustainable chartreuse. Organic celiac direct trade live-edge kitsch tacos pork belly copper mug.",
    UserId: 2
  },
  {
    title: "Finally a good tech blog",
    content: "Kitsch occupy typewriter franzen, dreamcatcher activated charcoal church-key ramps blue bottle. Hoodie +1 tattooed, wolf bodega boys pok pok pork belly. Letterpress master cleanse hella, disrupt 3 wolf moon bruh meggings lomo snackwave sustainable selfies yr. Freegan mustache fashion axe vexillologist, tofu ennui poke slow-carb before they sold out XOXO palo santo jianbing 3 wolf moon pork belly cronut. Bespoke narwhal tofu fingerstache +1 tattooed cronut fanny pack selfies pabst.",
    UserId: 3
  },
  {
    title: "Why is the sky blue?",
    content: "Pork belly jean shorts fingerstache, pabst austin portland prism 90's man bun cornhole pug enamel pin knausgaard twee organic. Hell of roof party kombucha thundercats. YOLO unicorn brunch, street art distillery fixie small batch actually cliche neutra iceland farm-to-table. Keytar meditation palo santo squid, vaporware beard coloring book try-hard. Big mood ethical tattooed, irony pop-up franzen mixtape twee lumbersexual cornhole forage asymmetrical raclette celiac. Forage try-hard hexagon semiotics poke literally tattooed. Yes plz copper mug deep v chartreuse.",
    UserId: 1
  },
  {
    title: "Yes",
    content: "Migas waistcoat godard iPhone ascot taiyaki, flexitarian authentic paleo kinfolk irony. Snackwave messenger bag vibecession chambray, woke austin authentic meditation organic gentrify jean shorts biodiesel hot chicken church-key banjo. Occupy kombucha copper mug flexitarian gluten-free. Enamel pin fashion axe PBR&B intelligentsia.",
    UserId: 3
  },
  {
    title: "How did we get here?",
    content: "DSA raw denim pinterest typewriter irony ethical kickstarter taxidermy fit wolf. Thundercats direct trade fam pok pok, four dollar toast cornhole tilde copper mug yes plz stumptown echo park. Jean shorts hoodie photo booth affogato paleo, hella vexillologist DIY. Chambray stumptown praxis bodega boys skateboard unicorn. Pickled fam polaroid, tacos etsy scenester selfies praxis artisan godard tofu raw denim bruh thundercats. Squid before they sold out hexagon flannel XOXO asymmetrical, mustache paleo cronut jianbing vinyl small batch tbh.",
    UserId: 3
  },
]

const commentData = [
  {
    content: "Very nice!",
    UserId: 3,
    PostId: 1
  },
  {
    content: "Yess!!",
    UserId: 2,
    PostId: 1
  },
  {
    content: "Ugh, no.",
    UserId: 1,
    PostId: 1
  },
  {
    content: "I like!",
    UserId: 1,
    PostId: 2
  },
  {
    content: "Ok but why?",
    UserId: 2,
    PostId: 2
  },
  {
    content: "How fun!",
    UserId: 3,
    PostId: 2
  },
  {
    content: "Ugh, no.",
    UserId: 1,
    PostId: 3
  },
  {
    content: "I like!",
    UserId: 1,
    PostId: 4
  },
  {
    content: "Ok but why?",
    UserId: 2,
    PostId: 5
  },
  {
    content: "How fun!",
    UserId: 3,
    PostId: 3
  }
]

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData);

  const comments = await Comment.bulkCreate(commentData);
};

seedDatabase();