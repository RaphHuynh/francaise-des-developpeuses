'use client';

import { User } from '@prisma/client';
import { handleDelete, handleUnban, handleValidate } from './profile.action';
import { format } from 'date-fns';

export default function Profile({ member }: { member: User }) {
  return (
    <div className="md:flex w-full even:bg-black/10 py-2 px-4 items-center">
      <details className="">
        <summary>
          {member.firstname} {member.lastname} (#{member.name}) mail :{' '}
          {member.email} url : {member.urlPortfolio} validation :{' '}
          {member.emailVerified && (
            <time suppressHydrationWarning>
              {format(member.emailVerified, 'dd/MM/yyyy HH:mm:ss')}
            </time>
          )}{' '}
          bannis :{' '}
          {member.bannished && (
            <time suppressHydrationWarning>
              {format(member.bannished, 'dd/MM/yyyy HH:mm:ss')}
            </time>
          )}
        </summary>
        {member.description}
      </details>
      <div className="md:flex mr-0 ml-auto gap-4">
        {!member.emailVerified && (
          <button
            className="bg-green-500 px-4 py-2 border-2 border-green-700 rounded-md"
            onClick={() => handleValidate(member.id)}
          >
            Valider
          </button>
        )}
        {member.bannished ? (
          <button
            className="bg-blue-500 border-2 border-blue-700 px-4 py-2 rounded-md"
            onClick={() => handleUnban(member.id)}
          >
            Débannir
          </button>
        ) : (
          <button
            className="bg-red-500 border-2 border-red-700 px-4 py-2 rounded-md"
            onClick={() => handleDelete(member.id)}
          >
            Bannir
          </button>
        )}
      </div>
    </div>
  );
}
