const fs = require('fs');
const path = require('path');

const ICON_MAP = {
  'ShieldAlert': 'ShieldWarning',
  'Target': 'Target',
  'Rocket': 'RocketLaunch',
  'Award': 'Medal',
  'ExternalLink': 'ArrowUpRight',
  'Activity': 'Activity',
  'Cpu': 'Cpu',
  'GraduationCap': 'GraduationCap',
  'MapPin': 'MapPin',
  'Building2': 'Buildings',
  'Mail': 'Envelope',
  'Phone': 'Phone',
  'MessageSquare': 'ChatCircleText',
  'Linkedin': 'LinkedinLogo',
  'Instagram': 'InstagramLogo',
  'Zap': 'Lightning',
  'Calendar': 'CalendarBlank',
  'ArrowRight': 'ArrowRight',
  'ShieldCheck': 'ShieldCheck',
  'Menu': 'List',
  'X': 'X',
  'Download': 'DownloadSimple',
  'Printer': 'Printer',
  'RotateCcw': 'ArrowCounterClockwise',
  'Check': 'Check',
  'UserCheck': 'UserCheck',
  'Radio': 'RadioButton',
  'UserCircle': 'UserCircle',
  'User': 'User',
  'Building': 'Buildings',
  'Hash': 'Hash',
  'Trophy': 'Trophy',
  'Plus': 'Plus',
  'CreditCard': 'CreditCard',
  'ChevronRight': 'CaretRight',
  'AlertCircle': 'WarningCircle',
  'Ticket': 'Ticket',
  'Sparkles': 'Sparkle',
  'Navigation': 'NavigationArrow',
  'Bus': 'Bus',
  'Train': 'Train',
  'Plane': 'Airplane',
  'Coffee': 'Coffee',
  'Play': 'Play',
  'Code2': 'Code',
  'BrainCircuit': 'Brain',
  'Terminal': 'TerminalWindow',
  'Clock': 'Clock',
  'CheckCircle2': 'CheckCircle',
  'ArrowUpRight': 'ArrowUpRight',
  'Users': 'Users'
};

const BLUE_FILES = ['Navbar.tsx', 'Footer.tsx', 'Contact.tsx', 'VideoSection.tsx'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  const fileName = path.basename(filePath);
  const isBlue = BLUE_FILES.includes(fileName) || filePath.includes('Registration');
  const accentColor = isBlue ? 'text-sky-400' : 'text-emerald-500';

  Object.entries(ICON_MAP).forEach(([oldName, newName]) => {
    // Replace <OldName ...> or <OldName>
    const tagRegex = new RegExp(`<${oldName}\\b([^>]*)>`, 'g');
    content = content.replace(tagRegex, (match, props) => {
      let newProps = props;
      if (!newProps.includes('weight="duotone"')) {
        newProps = ` weight="duotone"${newProps}`;
      }
      newProps = newProps.replace(/text-(?:white|slate-\d+|gray-\d+|neutral-\d+)(?:\/\d+)?/g, accentColor);
      newProps = newProps.replace(/text-primary/g, accentColor);
      return `<${newName}${newProps}>`;
    });
    
    // Also replace closing tags </OldName>
    const closeTagRegex = new RegExp(`</${oldName}>`, 'g');
    content = content.replace(closeTagRegex, `</${newName}>`);
  });

  // Also make sure any existing newName tags have the correct props
  Object.values(ICON_MAP).forEach(newName => {
    const tagRegex = new RegExp(`<${newName}\\b([^>]*)>`, 'g');
    content = content.replace(tagRegex, (match, props) => {
      if (props.includes('weight="duotone"')) return match;
      let newProps = props;
      newProps = ` weight="duotone"${newProps}`;
      newProps = newProps.replace(/text-(?:white|slate-\d+|gray-\d+|neutral-\d+)(?:\/\d+)?/g, accentColor);
      newProps = newProps.replace(/text-primary/g, accentColor);
      return `<${newName}${newProps}>`;
    });
  });

  // Fix imports
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]@phosphor-icons\/react['"];/g;
  content = content.replace(importRegex, (match, iconsStr) => {
    const icons = iconsStr.split(',').map(i => i.trim()).filter(i => i);
    const newIcons = icons.map(icon => {
      let originalName = icon;
      let alias = null;
      if (icon.includes(' as ')) {
        const parts = icon.split(' as ');
        originalName = parts[0].trim();
        alias = parts[1].trim();
      }
      if (ICON_MAP[originalName] && ICON_MAP[originalName] !== originalName) {
         if (alias) return `${ICON_MAP[originalName]} as ${alias}`;
         return ICON_MAP[originalName];
      }
      return icon;
    });
    return `import { ${[...new Set(newIcons)].join(', ')} } from '@phosphor-icons/react';`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('TrackCard.tsx')) { 
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log('Fix complete.');
