/**
 * Generate demo WAV audio files for Cooked Coder music player.
 * Each track gets a unique melody using Indian classical note frequencies.
 * Run: node scripts/generate-audio.cjs
 */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'cooked-coder', 'music');
fs.mkdirSync(outputDir, { recursive: true });

// Indian classical music notes (approximate Hz)
const Sa = 261.63, Re = 293.66, Ga = 329.63, Ma = 349.23;
const Pa = 392.00, Dha = 440.00, Ni = 493.88, SaH = 523.25;

const tracks = [
  { file: '01-lag-ja-gale',               notes: [Sa, Ga, Pa, Dha, Pa, Ga, Re, Sa, Re, Ga, Ma, Pa, Dha, Ni, SaH, Dha] },
  { file: '02-pal-pal-dil-ke-paas',       notes: [Re, Ma, Pa, Dha, Pa, Ma, Re, Sa, Ga, Ma, Pa, Dha, Ni, Dha, Pa, Ma] },
  { file: '03-o-mere-dil-ke-chain',        notes: [Ga, Pa, Dha, SaH, Ni, Dha, Pa, Ga, Ma, Pa, Dha, Ni, SaH, Ni, Dha, Pa] },
  { file: '04-gulabi-aankhen',             notes: [Pa, Dha, Ni, SaH, Dha, Pa, Ma, Ga, Re, Sa, Re, Ga, Ma, Pa, Dha, Pa] },
  { file: '05-abhi-na-jao-chhod-kar',      notes: [Sa, Re, Ga, Ma, Pa, Dha, Ni, SaH, Ni, Dha, Pa, Ma, Ga, Re, Sa, Re] },
  { file: '06-ajeeb-dastan-hai-yeh',       notes: [Ma, Pa, Dha, Ni, SaH, Ni, Dha, Pa, Ma, Ga, Re, Sa, Re, Ga, Ma, Pa] },
  { file: '07-kya-hua-tera-wada',          notes: [Re, Ga, Ma, Pa, Ma, Ga, Re, Sa, Ga, Pa, Dha, Pa, Ga, Re, Sa, Re] },
  { file: '08-chookar-mere-man-ko',        notes: [Dha, Ni, SaH, Ni, Dha, Pa, Ma, Ga, Pa, Dha, Ni, SaH, Ni, Dha, Pa, Ga] },
  { file: '09-tere-bina-zindagi-se',       notes: [Sa, Re, Ma, Pa, Dha, SaH, Dha, Pa, Ma, Re, Sa, Re, Ma, Pa, Dha, Pa] },
  { file: '10-zindagi-ke-safar-mein',      notes: [Ga, Pa, Ga, Re, Sa, Re, Ga, Ma, Pa, Dha, Pa, Ma, Ga, Re, Ga, Pa] },
  { file: '11-yeh-shaam-mastani',          notes: [Pa, Ma, Ga, Re, Sa, Re, Ga, Ma, Pa, Dha, Ni, Dha, Pa, Ma, Ga, Ma] },
  { file: '12-humein-tumse-pyaar-kitna',   notes: [Dha, Pa, Ma, Ga, Re, Ga, Ma, Pa, Dha, Ni, SaH, Ni, Dha, Pa, Ma, Pa] },
  { file: '13-aap-ki-aankhon-mein-kuch',   notes: [Ni, Dha, Pa, Ma, Ga, Ma, Pa, Dha, Ni, SaH, Ni, Dha, Pa, Ma, Pa, Dha] },
  { file: '14-chura-liya-hai-tumne',       notes: [Sa, Ma, Pa, Dha, SaH, Dha, Pa, Ma, Sa, Re, Ga, Ma, Pa, Ma, Ga, Re] },
  { file: '15-ek-ladki-ko-dekha',          notes: [Ga, Ma, Dha, SaH, Dha, Ma, Ga, Re, Sa, Re, Ga, Pa, Dha, Ni, Dha, Pa] },
];

function generateWav(filename, notes, durationSec = 30) {
  const sampleRate = 22050;
  const numSamples = sampleRate * durationSec;
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // --- WAV Header ---
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);          // PCM
  buffer.writeUInt16LE(1, 22);          // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // --- Audio Synthesis ---
  const noteDuration = durationSec / notes.length;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const noteIndex = Math.min(Math.floor(t / noteDuration), notes.length - 1);
    const freq = notes[noteIndex];

    // Fundamental + harmonics for a warm, sitar-like tone
    const fundamental = Math.sin(2 * Math.PI * freq * t);
    const h2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.35;
    const h3 = Math.sin(2 * Math.PI * freq * 3 * t) * 0.15;
    const h4 = Math.sin(2 * Math.PI * freq * 4 * t) * 0.05;

    // Smooth envelope (attack, sustain, release)
    const noteT = (t % noteDuration) / noteDuration;
    let envelope;
    if (noteT < 0.03) envelope = noteT / 0.03;           // Attack
    else if (noteT < 0.85) envelope = 1.0 - (noteT - 0.03) * 0.1; // Sustain w/ decay
    else envelope = (1.0 - noteT) / 0.15;                // Release

    // Gentle vibrato
    const vibrato = 1 + 0.004 * Math.sin(2 * Math.PI * 5.5 * t);

    // Tremolo
    const tremolo = 1 + 0.06 * Math.sin(2 * Math.PI * 3 * t);

    const sample = (fundamental + h2 + h3 + h4) * envelope * vibrato * tremolo * 0.22 * 32767;
    const clamped = Math.max(-32768, Math.min(32767, Math.round(sample)));
    buffer.writeInt16LE(clamped, 44 + i * 2);
  }

  const filepath = path.join(outputDir, `${filename}.wav`);
  fs.writeFileSync(filepath, buffer);
  const sizeMB = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`  ✓ ${filename}.wav (${sizeMB} MB)`);
}

console.log('\n🎵 Generating demo audio tracks for Cooked Coder...\n');

tracks.forEach((track, i) => {
  process.stdout.write(`  [${i + 1}/${tracks.length}] `);
  generateWav(track.file, track.notes);
});

console.log(`\n✅ All ${tracks.length} tracks generated in: ${outputDir}\n`);
