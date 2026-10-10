export interface Compliment {
  id: number;
  text: string;
  subtext?: string;
}

export interface SiteConfig {
  recipientName: string;
  media: {
    photo: string;
    photoAlt: string;
    video: string;
    music: string;
  };
  scene1: {
    dialogues: string[];
    buttonText: string;
  };
  scene2: {
    heading1: string;
    heading2: string;
    revealQuote1: string;
    revealQuote2: string;
    revealQuote3: string;
    tapPrompt: string;
  };
  scene3: {
    intro1: string;
    intro2: string;
    caption: string;
    videoErrorMessage: string;
  };
  scene4: {
    title: string;
    subtitle: string;
    compliments: Compliment[];
    continuePrompt: string;
    allOpenedMessage: string;
  };
  scene5: {
    envelopePrompt: string;
    buttonText: string;
    letterHeader: string;
    letterBody: string[];
    letterClosing: string;
    letterSignoff: string;
  };
  scene6: {
    prompt1: string;
    prompt2: string;
    yesButtonText: string;
    angryButtonText: string;
    yesResponse: string;
    angryResponse: string;
    proceedText: string;
  };
  finalScene: {
    line1: string;
    line2: string;
    line3: string;
    replayText: string;
  };
  audio: {
    defaultVolume: number;
    duckedVolume: number;
    fadeDurationMs: number;
  };
}

export const siteConfig: SiteConfig = {
  recipientName: "Prapti",

  media: {
    photo: "/media/prapti-photo.jpg",
    photoAlt: "Prapti looking breathtaking during Navratri",
    video: "/media/prapti-video.mp4",
    music: "/media/romantic-song.mp3",
  },

  scene1: {
    dialogues: [
      "Hey Prapti...",
      "I know I forgot something.",
      "And I know it mattered to you.",
      "So I made something just for you.",
    ],
    buttonText: "Open my heart ❤️",
  },

  scene2: {
    heading1: "That night, you got ready for Navratri...",
    heading2: "And somehow, I forgot to say the most obvious thing.",
    revealQuote1: "You looked absolutely breathtaking.",
    revealQuote2: "Not just beautiful...",
    revealQuote3: "Unforgettably beautiful.",
    tapPrompt: "Tap to view in full splendour ✨",
  },

  scene3: {
    intro1: "And there's something about seeing you like this...",
    intro2: "A moment I could watch a thousand times.",
    caption: "The way you hold light in your presence",
    videoErrorMessage: "Unable to load video. But even if pixels fail, the memory never does.",
  },

  scene4: {
    title: "Seven Things I Should Have Said",
    subtitle: "Touch each glowing heart to reveal the thoughts I held inside that night.",
    compliments: [
      {
        id: 1,
        text: "You looked so beautiful that night, baby.",
        subtext: "From the very first second I saw you.",
      },
      {
        id: 2,
        text: "That outfit was gorgeous, but you made it special.",
        subtext: "Clothes are just fabric until you wear them.",
      },
      {
        id: 3,
        text: "Your smile is still my favourite thing to look at.",
        subtext: "It lights up every room without even trying.",
      },
      {
        id: 4,
        text: "You didn't need any lights to shine that night.",
        subtext: "All the festive lamps paled next to you.",
      },
      {
        id: 5,
        text: "I wish I could show you how beautiful you look through my eyes.",
        subtext: "You would never doubt yourself for a single heartbeat.",
      },
      {
        id: 6,
        text: "I'm sorry I didn't tell you all this when you deserved to hear it.",
        subtext: "You shouldn't ever have to wait or wonder.",
      },
      {
        id: 7,
        text: "You're beautiful every day, Prapti. And I never want you to forget that.",
        subtext: "Today, tomorrow, and forever.",
      },
    ],
    continuePrompt: "Continue forward ✨",
    allOpenedMessage: "Every thought has been unlocked for you ❤️",
  },

  scene5: {
    envelopePrompt: "One more thing, baby...",
    buttonText: "Read my letter 💌",
    letterHeader: "My prettiest Prapti,",
    letterBody: [
      "I know I messed up.",
      "You got ready for Navratri, looked absolutely gorgeous, and deserved to hear that from me without having to ask.",
      "And I forgot.",
      "I'm genuinely sorry, baby.",
      "I should have noticed how much that moment meant to you and made you feel special right then.",
      "You looked stunning. And I wish I'd said it a hundred times that night.",
      "But beyond the outfit, the pictures, and everything else, you're the girl who makes my ordinary days special.",
      "I can't go back and change that moment, but I can do better at expressing how much I appreciate you.",
      "I love you, Prapti.",
      "And I promise to make more effort to show it.",
    ],
    letterClosing: "Forever your stupid boyfriend ❤️",
    letterSignoff: "With all my love",
  },

  scene6: {
    prompt1: "Before you go...",
    prompt2: "Can I make it up to you?",
    yesButtonText: "Yes, baby ❤️",
    angryButtonText: "I'm still angry 😤",
    yesResponse: "You just made my whole world a little brighter.",
    angryResponse: "That's okay, baby. Take your time. I'm still here, and I'll do better.",
    proceedText: "There's one last thing I want to leave you with...",
  },

  finalScene: {
    line1: "If only you could see yourself through my eyes...",
    line2: "You'd know just how beautiful you are.",
    line3: "I love you, Prapti. ❤️",
    replayText: "Experience from the beginning ✨",
  },

  audio: {
    defaultVolume: 0.75,
    duckedVolume: 0.12,
    fadeDurationMs: 1200,
  },
};
