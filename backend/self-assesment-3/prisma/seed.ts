import prisma from "../lib/prisma";
import { Role } from "@/app/generated/prisma/enums";

async function main() {

  // =========================
  // DELETE OLD DATA
  // =========================

  await prisma.song.deleteMany();
  await prisma.label.deleteMany();
  await prisma.album.deleteMany();
  await prisma.user.deleteMany();

  console.log("Old data deleted");

  // =========================
  // USERS (8)
  // =========================

  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: "ankit",
        email: "ankit@example.com",
        password: "password123",
        role: Role.Admin,
      },
    }),

    prisma.user.create({
      data: {
        username: "rahul",
        email: "rahul@example.com",
        password: "password123",
        role: Role.user,
      },
    }),

    prisma.user.create({
      data: {
        username: "rohit",
        email: "rohit@example.com",
        password: "password123",
        role: Role.user,
      },
    }),

    prisma.user.create({
      data: {
        username: "aman",
        email: "aman@example.com",
        password: "password123",
        role: Role.user,
      },
    }),

    prisma.user.create({
      data: {
        username: "sneha",
        email: "sneha@example.com",
        password: "password123",
        role: Role.user,
      },
    }),

    prisma.user.create({
      data: {
        username: "priya",
        email: "priya@example.com",
        password: "password123",
        role: Role.user,
      },
    }),

    prisma.user.create({
      data: {
        username: "vikas",
        email: "vikas@example.com",
        password: "password123",
        role: Role.user,
      },
    }),

    prisma.user.create({
      data: {
        username: "arjun",
        email: "arjun@example.com",
        password: "password123",
        role: Role.user,
      },
    }),
  ]);

  console.log("Users created");

  // =========================
  // LABELS (8)
  // =========================

  const labels = await Promise.all([
    prisma.label.create({ data: { name: "T-Series" } }),
    prisma.label.create({ data: { name: "Sony Music" } }),
    prisma.label.create({ data: { name: "Universal Music" } }),
    prisma.label.create({ data: { name: "Zee Music" } }),
    prisma.label.create({ data: { name: "Saregama" } }),
    prisma.label.create({ data: { name: "Warner Music" } }),
    prisma.label.create({ data: { name: "EMI Records" } }),
    prisma.label.create({ data: { name: "YRF Music" } }),
  ]);

  console.log("Labels created");

  // =========================
  // ALBUMS (8)
  // =========================

  const albumNames = [
    "Midnight Echoes",
    "Broken Frequencies",
    "Digital Horizon",
    "Neon Dreams",
    "Lost Signals",
    "Electric Nights",
    "Cosmic Waves",
    "Silent Storm",
  ];

  const albums = [];

  for (let i = 0; i < 8; i++) {

    const album = await prisma.album.create({
      data: {
        title: albumNames[i],
        artist: `Artist ${i + 1}`,
        release_year: 2020 + i,
        genre: [
          "Synthwave",
          "Lo-Fi",
          "Pop",
          "Rock",
          "Hip-Hop",
          "EDM",
          "Jazz",
          "Classical",
        ][i],

        description: `Description for ${albumNames[i]}`,

        publisher_id: users[i].id,
      },
    });

    albums.push(album);
  }

  console.log("Albums created");

  // =========================
  // SONGS
  // 8 songs per album
  // Total = 64 songs
  // =========================

  let songCounter = 1;

  for (const album of albums) {

    for (let i = 1; i <= 8; i++) {

      const randomLabel1 =
        labels[Math.floor(Math.random() * labels.length)];

      const randomLabel2 =
        labels[Math.floor(Math.random() * labels.length)];

      await prisma.song.create({
        data: {
          title: `Song ${songCounter}`,
          duration_seconds: 180 + i * 10,

          lyrics: `Lyrics for Song ${songCounter}`,

          cover_image: `https://picsum.photos/seed/${songCounter}/400/400`,

          isCover: i === 1,

          order: i,

          view_count: Math.floor(Math.random() * 100000),

          album_id: album.album_id,

          label: {
            connect: [
              {
                label_id: randomLabel1.label_id,
              },
              {
                label_id: randomLabel2.label_id,
              },
            ],
          },
        },
      });

      songCounter++;
    }
  }

  console.log("Songs created");

  console.log("Database seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });