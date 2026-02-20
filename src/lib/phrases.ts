export type QuickPhrase = {
  id: string
  text: string
  category: string
}

export const defaultPhrases: QuickPhrase[] = [
  // Greetings
  { id: '1', text: 'Hello!', category: 'Greetings' },
  { id: '2', text: 'Nice to meet you.', category: 'Greetings' },
  { id: '3', text: 'Good morning.', category: 'Greetings' },
  { id: '4', text: 'Good afternoon.', category: 'Greetings' },
  { id: '5', text: 'Good evening.', category: 'Greetings' },
  { id: '6', text: 'How are you?', category: 'Greetings' },
  { id: '7', text: 'Thank you.', category: 'Greetings' },
  { id: '8', text: 'Goodbye.', category: 'Greetings' },

  // Classroom
  { id: '9', text: 'Please repeat that.', category: 'Classroom' },
  { id: '10', text: 'Can you slow down?', category: 'Classroom' },
  { id: '11', text: 'I didn’t catch that.', category: 'Classroom' },
  { id: '12', text: 'What page are we on?', category: 'Classroom' },
  { id: '13', text: 'Can you write it down?', category: 'Classroom' },
  { id: '14', text: 'I need more time.', category: 'Classroom' },
  { id: '15', text: 'Can I see the slides?', category: 'Classroom' },
  { id: '16', text: 'Please face me when speaking.', category: 'Classroom' },
  { id: '17', text: 'I am hard of hearing.', category: 'Classroom' },
  { id: '18', text: 'Thank you for speaking clearly.', category: 'Classroom' },

  // Workplace
  { id: '19', text: 'Let’s use chat instead.', category: 'Workplace' },
  { id: '20', text: 'Please send that in writing.', category: 'Workplace' },
  { id: '21', text: 'I understand.', category: 'Workplace' },
  { id: '22', text: 'Can we schedule a meeting?', category: 'Workplace' },
  { id: '23', text: 'Could you use the microphone?', category: 'Workplace' },
  { id: '24', text: 'I need clarification.', category: 'Workplace' },
  { id: '25', text: 'Can you summarize that?', category: 'Workplace' },
  { id: '26', text: 'I need an interpreter.', category: 'Workplace' },
  { id: '27', text: 'Please speak one at a time.', category: 'Workplace' },
  { id: '28', text: 'I need a moment to process.', category: 'Workplace' },

  // Emergency
  { id: '29', text: 'This is an emergency.', category: 'Emergency' },
  { id: '30', text: 'Please call 911.', category: 'Emergency' },
  { id: '31', text: 'I need help.', category: 'Emergency' },
  { id: '32', text: 'I am deaf/hard of hearing.', category: 'Emergency' },
  { id: '33', text: 'Call an ambulance.', category: 'Emergency' },
  { id: '34', text: 'I am injured.', category: 'Emergency' },
  { id: '35', text: 'Please stay with me.', category: 'Emergency' },
  { id: '36', text: 'Where is the nearest hospital?', category: 'Emergency' },

  // Social
  { id: '37', text: 'Yes.', category: 'Social' },
  { id: '38', text: 'No.', category: 'Social' },
  { id: '39', text: 'Please wait.', category: 'Social' },
  { id: '40', text: 'Excuse me.', category: 'Social' },
  { id: '41', text: 'I’ll be right back.', category: 'Social' },
  { id: '42', text: 'That’s okay.', category: 'Social' },
  { id: '43', text: 'I’m not sure.', category: 'Social' },
  { id: '44', text: 'Could you text me?', category: 'Social' },

  // Daily Life
  { id: '45', text: 'What time does this close?', category: 'Daily Life' },
  { id: '46', text: 'How much does this cost?', category: 'Daily Life' },
  { id: '47', text: 'Can I pay by card?', category: 'Daily Life' },
  { id: '48', text: 'Where is the restroom?', category: 'Daily Life' },
  { id: '49', text: 'Can you help me?', category: 'Daily Life' },
  { id: '50', text: 'I don’t understand.', category: 'Daily Life' },
]