
.PHONY = all clean run

all:
	tsc

run:
	@echo "Running localhost page server..."
	@servePage .

clean:
	@echo "Cleaning up..."
	rm -f built/*.js built/*.js.map
