import { Trash, ThumbsUp } from 'phosphor-react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'



export function Comment({ content, onDeleteComment }){

  function handleDeleteComment(){
    console.log('deleted')
  
    onDeleteComment(content);
  }

  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://avatars.githubusercontent.com/u/62817107?v=4"/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent} >
          <header>
            <div className={styles.authorAndTime} >
              <strong>Giovanni Lopes</strong>  
              <time title='11 de Maio ás 08:13h' dateTime='2022-05-11 08:13:30' >Cerca de 1h atrás</time>
            </div>  

            <button onClick={handleDeleteComment} title="Deletar comentário" >
              <Trash size="24"/>
            </button>

          </header> 
          <p>{content}</p>
        </div>
        <footer>
          <button>
            <ThumbsUp/>
            Aplaudir <span>20</span>
          </button>
        </footer>

      </div>

    </div>
  )
}