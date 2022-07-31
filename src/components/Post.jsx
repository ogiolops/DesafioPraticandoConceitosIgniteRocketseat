import { format, formatDistanceToNow } from 'date-fns';
import ptBR  from 'date-fns/locale/pt-BR'
import { useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';


export function Post({ author, publishedAt, content }){

  const [comments, setComments] = useState([
    'Post muito bacana!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, " d 'de' LLLL 'ás' HH:mm'h'", { 
      locale: ptBR,
  });

  const publishedDateRealativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment (){
    event.preventDefault();

    setComments([...comments, newCommentText ]);
    setNewCommentText('')
  }

  function handleNewCommentChange (){
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete){
    const commentWithoutDeleteOne = comments.filter( comment => {
      return comment != commentToDelete;
    })

    setComments(commentWithoutDeleteOne)
  }

  return(
    <article className={styles.post}>
      <header >
        <div className={styles.author} >
            <Avatar hasBorder src={author.avatarUrl} />
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>

          <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()} >
            {publishedDateRealativeToNow}
            
          </time>

      </header>

      <div className={styles.content} >
        {content.map(line =>{
          if (line.type === 'paragraph'){
            return <p key={line.content} >{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content} > <a href='#'> {line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment}  className={styles.commentForm}>
        <strong>Deixe o seu Feedback</strong>

        <textarea 
          name="comment"
          value={newCommentText}
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
          >
        </textarea>

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
        
      </form>

      <div className={styles.commentList}>
        {comments.map(comment =>{
          return (
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    
    </article>
  )
}