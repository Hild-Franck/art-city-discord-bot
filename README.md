# Art City Discord bot

This repo hold the code for the Art City server bot.

## Usage

Run `npm run build` to build the project

Run `node dist/index.js` to run the project

### Docker

You can build and run a Docker image instead.

Run `docker build -t art-city-discord-bot .` to build the image

Run `docker run -v ./config.json:/app/dist/config.json art-city-discord-bot`

## Environments

You need the following environment variables:

- `TOKEN`: Discord bot token.
- `CLIENT_ID`: Discord bot client id
- `GUILD_ID`: Discord server id

## Channels

You can add channels to the `config.json` file with the following structure:

```json
{
  "name": "<user defined channel name>",
  "id": "<Discord channel id>"
}
```

In the code, you can refer to those channels with `channels.get("<user defined channel name>")`

## Commands

You can add commands by adding their script in `src/commands/context` or `src/commands/slash` depending if it's a slash command or a context menu command.

A command needs to export a `data` property and a `execute` property.
