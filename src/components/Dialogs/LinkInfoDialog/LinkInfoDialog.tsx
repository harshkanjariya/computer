import BasicDialog, {BasicDialogProps} from '../BasicDialog';
import BaseFolder from '../../Folder/BaseFolder';
import styles from './LinkInfoDialog.module.scss';

interface LinkInfoDialog extends BasicDialogProps {
  data: {
    description?: string;
    links?: any;
    icons?: any;
    name?: string;
  }
}

function LinkInfoDialog(props: LinkInfoDialog) {
  const formatDescription = (description?: string) => {
    if (!description) return null;
    return description.split('\n').map((line, index) => (
      <div key={index} style={{ marginBottom: line.trim() ? '8px' : '4px' }}>
        {line.trim() ? (
          <span style={{ 
            fontWeight: line.includes(':') && !line.includes('http') ? '600' : 'normal',
            display: 'block'
          }}>
            {line}
          </span>
        ) : null}
      </div>
    ));
  };

  return <BasicDialog isOpen={props.isOpen} onClose={props.onClose} title={props.data.name}>
    <div className={styles.description}>
      {formatDescription(props.data.description)}
    </div>
    {props.data.links && Object.keys(props.data.links).length > 0 && (
      <div className={styles.linkList}>
        {Object.keys(props.data.links).map((key) =>
          <BaseFolder
            rounded={true}
            key={key}
            name={key}
            image={props.data.icons?.[key]}
            onOpen={() => window.open(props.data.links[key])}
          />
        )}
      </div>
    )}
  </BasicDialog>;
}

export default LinkInfoDialog;