process.chdir(__dirname + '/..');

const { User, Post, Review } = require('../models');
const sequelize = require('../db/config');
const bcrypt = require('bcrypt');

const tableExists = async tableName => {
  const query = `
    SELECT COUNT(*) as count
    FROM information_schema.tables
    WHERE table_name = :tableName
  `;
  const [result] = await sequelize.query(query, {
    replacements: { tableName },
    type: sequelize.QueryTypes.SELECT,
  });
  return result.count > 0;
};

const seedDatabase = async () => {
  try {
    // Create tables if they do not exist
    await sequelize.sync();

    // Clear existing data
    const postTableExists = await tableExists('posts');
    const reviewTableExists = await tableExists('reviews');
    const userTableExists = await tableExists('users');

    if (postTableExists) {
      await Post.destroy({ where: {} });
    }
    if (reviewTableExists) {
      await Review.destroy({ where: {} });
    }
    if (userTableExists) {
      await User.destroy({ where: {} });
    }

    const users = await User.bulkCreate([
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password1', 10),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password2', 10),
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@example.com',
        password: await bcrypt.hash('password3', 10),
      },
      {
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@example.com',
        password: await bcrypt.hash('password4', 10),
      },
    ]);

    for (const user of users) {
      const posts = await Post.bulkCreate([
        {
          postName: 'Post 1',
          postContent:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          userId: user.id,
        },
        {
          postName: 'Post 2',
          postContent:
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          userId: user.id,
        },
      ]);

      for (const post of posts) {
        const reviews = await Review.bulkCreate([
          {
            reviewContent: 'Great post!',
            userId: user.id,
            postId: post.id,
          },
          {
            reviewContent: 'Excellent content!',
            userId: user.id,
            postId: post.id,
          },
        ]);
      }
    }

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
