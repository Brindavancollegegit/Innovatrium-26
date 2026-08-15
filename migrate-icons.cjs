const fs = require('fs');
const path = require('path');

const ICON_MAP = {
  'ShieldAlert': 'ShieldWarning',
  'Users': 'Users',
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
};

// Files that should use blue-500 instead of emerald-500
const BLUE_FILES = ['Navbar.tsx', 'Footer.tsx', 'Contact.tsx', 'VideoSection.tsx'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('lucide-react')) return;

  const fileName = path.basename(filePath);
  const isBlue = BLUE_FILES.includes(fileName) || filePath.includes('Registration');
  const accentColor = isBlue ? 'text-sky-400' : 'text-emerald-500';

  // 1. Replace imports
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];/g;
  let importedIcons = [];
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
      const mappedName = ICON_MAP[originalName] || originalName;
      if (alias) {
        importedIcons.push(alias);
        return `${mappedName} as ${alias}`;
      } else {
        importedIcons.push(mappedName);
        return mappedName;
      }
    });
    return `import { ${newIcons.join(', ')} } from '@phosphor-icons/react';`;
  });

  // 2. Add weight="duotone" and update colors for each icon component
  importedIcons.forEach(iconName => {
    // Regex to match <IconName ... /> or <IconName>...</IconName>
    const tagRegex = new RegExp(`<${iconName}\\b([^>]*)>`, 'g');
    content = content.replace(tagRegex, (match, props) => {
      if (props.includes('weight="duotone"')) return match;
      
      let newProps = props;
      // Replace non-accent text colors with accent color
      newProps = newProps.replace(/text-(?:white|slate-\d+|gray-\d+|neutral-\d+)(?:\/\d+)?/g, accentColor);
      // Replace text-primary with accent if it's not already
      newProps = newProps.replace(/text-primary/g, accentColor);
      
      // Add weight prop
      return `<${iconName} weight="duotone"${newProps}>`;
    });
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
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
console.log('Migration complete.');
