import { LanguageKey } from './types';

export default {
  javascript: {
    label: 'JavaScript',
    syntaxHighlighterKey: 'javascript',
  },
  react: {
    label: 'React',
    syntaxHighlighterKey: 'javascript',
  },
  java: {
    label: 'Java',
    syntaxHighlighterKey: 'java',
  },
  ruby: {
    label: 'Ruby',
    syntaxHighlighterKey: 'ruby',
  },
  python: {
    label: 'Python',
    syntaxHighlighterKey: 'python',
  },
  php: {
    label: 'PHP',
    syntaxHighlighterKey: 'php',
  },
  shell: {
    label: 'Shell',
    syntaxHighlighterKey: 'bash',
  },
  csharp: {
    label: 'C# .NET',
    syntaxHighlighterKey: 'csharp',
  },
  go: {
    label: 'Go',
    syntaxHighlighterKey: 'go',
  },
  html: {
    label: 'HTML',
    syntaxHighlighterKey: 'xml',
  },
  cpp: {
    label: 'C++',
    syntaxHighlighterKey: 'cpp',
  },
  dart: {
    label: 'Dart',
    syntaxHighlighterKey: 'dart',
  },
  swift: {
    label: 'Swift',
    syntaxHighlighterKey: 'swift',
  },
  objc: {
    label: 'Objective-C',
    syntaxHighlighterKey: 'objc',
    alias: 'objectivec',
  },
  nodejs: {
    label: 'Node.js',
    syntaxHighlighterKey: 'javascript',
  },
  json: {
    label: 'JSON',
    syntaxHighlighterKey: 'json',
  },
  xml: {
    label: 'XML',
    syntaxHighlighterKey: 'xml',
  },
  sql: {
    label: 'SQL',
    syntaxHighlighterKey: 'sql',
  },
  android: {
    label: 'Android',
    syntaxHighlighterKey: 'java',
  },
  flutter: {
    label: 'Flutter',
    syntaxHighlighterKey: 'dart',
  },
  kotlin: {
    label: 'Kotlin',
    syntaxHighlighterKey: 'kotlin',
  },
  realtime: {
    label: 'Realtime',
    syntaxHighlighterKey: 'javascript',
  },
  rest: {
    label: 'REST',
    syntaxHighlighterKey: 'javascript',
  },
} as Record<LanguageKey, { label: string; syntaxHighlighterKey: string; alias?: string }>;
